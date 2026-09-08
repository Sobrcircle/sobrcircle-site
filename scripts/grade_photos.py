#!/usr/bin/env python3
"""
Batch colour grade for the Lisa & Dale gallery.

WHY NOT FFMPEG
--------------
ffmpeg cannot be trusted with these stills, and fails silently both ways:

  1. It decodes iPhone .HEIC at 896x1024 — the *embedded preview*, not the
     8064x6048 original. Grading through it would quietly throw away 98% of
     every photograph.
  2. Encoding a 48 MP TIFF to JPEG, it transposes the image (8064x6048 in,
     6048x8064 out) and writes a completely black file — with no filters
     applied and no error reported.

So: macOS `sips` decodes HEIC (verified against the originals), and Pillow
does the grading and encoding. Every output is dimension-checked against its
source before it is kept.

THE LOOK
--------
One look across every frame is what makes a set read as a single body of work.
Each is built from four moves:

  curve         lift the black point so shadows go soft and matte, never
                crushed — this is what reads as "airy"
  split-tone    warmth into the MIDTONES, highlights left near-neutral.
                Gold in the highlights is what turns bright wedding frames
                dingy; this is the single most important choice here.
  saturation    eased back slightly so skin stays natural
  bloom         a blurred copy screened back at low opacity (Orton effect)

Blur and sharpening radii are expressed as a FRACTION of the image's long
edge, so the 2400px web copy and the 8064px download get the same look rather
than the same pixel counts.

The film is never touched by this script.

Usage:
  python3 scripts/grade_photos.py --contact ~/Desktop/lisadale/IMG_9433.HEIC
  python3 scripts/grade_photos.py --in ~/Desktop/lisadale --out ./graded --look ivory
"""

import argparse
import os
import subprocess
import sys
import tempfile

import numpy as np
from PIL import Image, ImageChops, ImageEnhance, ImageFilter

Image.MAX_IMAGE_PIXELS = None  # these are 48 MP by design

LOOKS = {
    # THE LOOK — matched to the reference photographs: bright and glowing, but
    # punchy. The earlier "matte film" approach (lifted blacks, saturation and
    # contrast pulled *down*) read as flat and is gone.
    #
    # Order matters here and is the whole trick:
    #   1. bloom first  — screen a blurred copy to get the backlit glow
    #   2. curve after  — an S-curve then RESTORES the contrast the bloom ate,
    #                     so highlights glow while blacks stay genuinely black
    #   3. saturation   — pushed up, not down; greens and skin should sing
    "radiant": {
        "bloom_first": True,
        "bloom_sigma": 0.005, "bloom_opacity": 0.07,
        "halation_sigma": 0.016, "halation_opacity": 0.42,
        "halation_threshold": 0.62, "halation_warmth": 0.07,
        # S-curve: shadows held down, midtones and highlights lifted.
        "curve": {
            "r": [(0, 0.0), (0.15, 0.125), (0.35, 0.365), (0.5, 0.550), (0.75, 0.822), (0.9, 0.945), (1, 1.0)],
            "g": [(0, 0.0), (0.15, 0.124), (0.35, 0.362), (0.5, 0.546), (0.75, 0.818), (0.9, 0.943), (1, 1.0)],
            "b": [(0, 0.0), (0.15, 0.128), (0.35, 0.360), (0.5, 0.540), (0.75, 0.808), (0.9, 0.938), (1, 1.0)],
        },
        "shadow": (-0.006, 0.000, 0.014),   # a whisper of cool in the shadows
        "mid":    ( 0.011, 0.004, -0.012),  # warm, but no extra red
        "high":   ( 0.006, 0.002, -0.004),  # highlights stay clean white
        "vibrance": 0.55, "saturation": 1.0, "contrast": 1.07, "brightness": 1.035,
        "sharpen": 0.85,
    },
    # Same look, dialled back — for frames that are already contrasty.
    "radiant-soft": {
        "bloom_first": True,
        "bloom_sigma": 0.005, "bloom_opacity": 0.06,
        "halation_sigma": 0.014, "halation_opacity": 0.30,
        "halation_threshold": 0.66, "halation_warmth": 0.06,
        "curve": {
            "r": [(0, 0.0), (0.15, 0.135), (0.35, 0.368), (0.5, 0.545), (0.75, 0.815), (0.9, 0.942), (1, 1.0)],
            "g": [(0, 0.0), (0.15, 0.134), (0.35, 0.365), (0.5, 0.542), (0.75, 0.812), (0.9, 0.940), (1, 1.0)],
            "b": [(0, 0.0), (0.15, 0.138), (0.35, 0.363), (0.5, 0.537), (0.75, 0.804), (0.9, 0.936), (1, 1.0)],
        },
        "shadow": (-0.005, 0.000, 0.012),
        "mid":    ( 0.014, 0.003, -0.012),
        "high":   ( 0.005, 0.002, -0.003),
        "vibrance": 0.38, "saturation": 1.0, "contrast": 1.04, "brightness": 1.025,
        "sharpen": 0.75,
    },
    # Kept only so the flat original can be compared against. Do not ship this.
    "matte-old": {
        "bloom_first": False,
        "curve": {
            "r": [(0, 0.070), (0.25, 0.315), (0.5, 0.560), (0.75, 0.800), (1, 1.0)],
            "g": [(0, 0.072), (0.25, 0.315), (0.5, 0.558), (0.75, 0.798), (1, 1.0)],
            "b": [(0, 0.090), (0.25, 0.325), (0.5, 0.560), (0.75, 0.795), (1, 0.998)],
        },
        "shadow": (-0.025, 0.000, 0.050),
        "mid":    ( 0.040, 0.010, -0.035),
        "high":   ( 0.012, 0.000, -0.008),
        "saturation": 0.88, "contrast": 0.94, "brightness": 1.022,
        "bloom_sigma": 0.0055, "bloom_opacity": 0.13,
        "sharpen": 0.5,
    },
}


def build_luts(look):
    """One 256-entry LUT per channel: tone curve plus luminance-weighted
    split-tone, folded together so the whole grade is a single fast pass."""
    t = np.linspace(0.0, 1.0, 256)
    # Smooth tonal-range weights that always sum to 1.
    w_s, w_m, w_h = (1 - t) ** 2, 4 * t * (1 - t), t ** 2
    total = w_s + w_m + w_h
    w_s, w_m, w_h = w_s / total, w_m / total, w_h / total

    luts = []
    for i, ch in enumerate("rgb"):
        pts = look["curve"][ch]
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        curved = np.interp(t, xs, ys)
        shift = w_s * look["shadow"][i] + w_m * look["mid"][i] + w_h * look["high"][i]
        luts.append(np.clip((curved + shift) * 255.0, 0, 255).astype(np.uint8))
    return np.concatenate(luts).tolist()


def halation(img, sigma, opacity, threshold, warmth):
    """Light bleeding outward from bright edges — the glow in the reference.

    A plain blurred-and-screened copy hazes the whole frame uniformly. Real
    halation comes only from the highlights: isolate what is already bright,
    blur *that* generously, and screen it back, and the light spills around
    edges — rim-lit hair, a white dress against dark trees, sun through leaves.

    On film the bleed happens most in the red layer, so the glow is tinted
    faintly warm. That is what stops it reading as a digital blur.
    """
    if opacity <= 0 or sigma < 0.5:
        return img

    # Soft threshold: nothing below `threshold`, ramping smoothly to full.
    t = np.arange(256, dtype=np.float32) / 255.0
    x = np.clip((t - threshold) / max(1e-6, 1.0 - threshold), 0, 1)
    ramp = (x * x * (3 - 2 * x) * 255).astype(np.uint8)          # smoothstep
    mask = img.convert("L").point(ramp.tolist())

    highlights = ImageChops.multiply(img, Image.merge("RGB", (mask, mask, mask)))
    glow = highlights.filter(ImageFilter.GaussianBlur(radius=sigma))

    if warmth:
        r, g, b = glow.split()
        r = r.point(lambda v: min(255, int(v * (1 + warmth))))
        b = b.point(lambda v: int(v * (1 - warmth * 0.6)))
        glow = Image.merge("RGB", (r, g, b))

    return Image.blend(img, ImageChops.screen(img, glow), opacity)


def apply_vibrance(img, amount):
    """Saturation weighted by how unsaturated a pixel already is.

    Flat saturation pushes skin that is already ruddy further red — very
    visible on a sunburned face. Vibrance scales by (1 - S), so muted greens,
    sky and whites gain a lot while saturated skin barely moves. Done as a
    256-entry LUT on the HSV S channel, so it stays fast at 48 MP.
    """
    if amount == 0:
        return img
    hsv = img.convert("HSV")
    h, sat, v = hsv.split()
    t = np.arange(256, dtype=np.float32) / 255.0
    lut = np.clip(t * (1.0 + amount * (1.0 - t)), 0, 1) * 255.0
    sat = sat.point(lut.astype(np.uint8).tolist())
    return Image.merge("HSV", (h, sat, v)).convert("RGB")


def grade(img, look):
    """Apply the look. Radii scale with the image so every size matches."""
    img = img.convert("RGB")
    long_edge = max(img.size)

    def bloom(im):
        sigma = look["bloom_sigma"] * long_edge
        if sigma < 0.5 or look["bloom_opacity"] <= 0:
            return im
        blurred = im.filter(ImageFilter.GaussianBlur(radius=sigma))
        return Image.blend(im, ImageChops.screen(im, blurred), look["bloom_opacity"])

    # Glow first, then the curve restores contrast on top of it. Doing this the
    # other way round is what made the first attempt look washed out.
    if look.get("bloom_first"):
        img = bloom(img)
        img = halation(
            img,
            sigma=look.get("halation_sigma", 0) * long_edge,
            opacity=look.get("halation_opacity", 0),
            threshold=look.get("halation_threshold", 0.66),
            warmth=look.get("halation_warmth", 0.06),
        )
        img = img.point(build_luts(look))
    else:
        img = img.point(build_luts(look))
        img = bloom(img)

    img = apply_vibrance(img, look.get("vibrance", 0.0))
    if look.get("saturation", 1.0) != 1.0:
        img = ImageEnhance.Color(img).enhance(look["saturation"])
    img = ImageEnhance.Contrast(img).enhance(look["contrast"])
    img = ImageEnhance.Brightness(img).enhance(look["brightness"])

    if look["sharpen"] > 0:
        img = img.filter(
            ImageFilter.UnsharpMask(
                radius=max(1.0, 0.0006 * long_edge),
                percent=int(look["sharpen"] * 100),
                threshold=3,
            )
        )
    return img


def source_size(path):
    """Truth for dimensions. sips reads HEIC correctly where ffmpeg does not."""
    try:
        out = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
            capture_output=True, text=True, check=True,
        ).stdout
        w = h = None
        for line in out.splitlines():
            if "pixelWidth:" in line:
                w = int(line.split(":")[1])
            elif "pixelHeight:" in line:
                h = int(line.split(":")[1])
        return (w, h) if w and h else None
    except Exception:
        return None


def load(path, tmpdir):
    """Open any of the folder's formats at true full resolution."""
    if path.lower().endswith((".heic", ".heif")):
        tiff = os.path.join(tmpdir, "decode.tiff")
        subprocess.run(["sips", "-s", "format", "tiff", path, "--out", tiff],
                       capture_output=True, check=True)
        img = Image.open(tiff)
        img.load()          # read before the temp file is removed
        os.remove(tiff)
        return img
    img = Image.open(path)
    img.load()
    return img


def save_jpeg(img, path, quality, subsampling):
    img.save(path, "JPEG", quality=quality, subsampling=subsampling,
             optimize=True, progressive=True)


def collect(indir):
    files = [f for f in os.listdir(indir)
             if f.lower().endswith((".heic", ".heif", ".jpg", ".jpeg", ".png", ".tif", ".tiff"))]
    return sorted(files)  # iPhone names sort chronologically


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="indir")
    ap.add_argument("--out", dest="outdir", default="./graded")
    ap.add_argument("--look", default="radiant", choices=list(LOOKS))
    ap.add_argument("--contact")
    ap.add_argument("--web-long-edge", type=int, default=2400)
    ap.add_argument("--full-quality", type=int, default=95)
    ap.add_argument("--web-quality", type=int, default=90)
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        if args.contact:
            src = Image.open(args.contact) if not args.contact.lower().endswith(("heic", "heif")) \
                else load(args.contact, tmp)
            h = 1100
            panels = [src.convert("RGB").resize(
                (int(src.width * h / src.height), h), Image.LANCZOS)]
            for name in LOOKS:
                panels.append(grade(panels[0].copy(), LOOKS[name]))
            gap, ivory = 8, (250, 247, 242)
            w = sum(p.width for p in panels) + gap * (len(panels) - 1)
            sheet = Image.new("RGB", (w, h), ivory)
            x = 0
            for p in panels:
                sheet.paste(p, (x, 0))
                x += p.width + gap
            out = args.outdir if args.outdir.endswith(".jpg") else "look-comparison.jpg"
            save_jpeg(sheet, out, 92, 0)
            print(f"Wrote {out}  —  original | {' | '.join(LOOKS)}")
            return

        if not args.indir:
            ap.error("--in is required (or use --contact)")

        web_dir = os.path.join(args.outdir, "web")
        full_dir = os.path.join(args.outdir, "full")
        os.makedirs(web_dir, exist_ok=True)
        os.makedirs(full_dir, exist_ok=True)

        files = collect(args.indir)
        print(f"Grading {len(files)} photographs with the \"{args.look}\" look…\n")
        look = LOOKS[args.look]
        manifest = []

        for n, name in enumerate(files, start=1):
            src_path = os.path.join(args.indir, name)
            pid = f"{n:03d}"
            expected = source_size(src_path)

            img = load(src_path, tmp)
            # Compare unordered: sips reports the STORED dimensions, but its
            # TIFF conversion applies EXIF rotation, so a portrait frame
            # legitimately comes back transposed. Comparing the pair as a set
            # still catches the real hazard — ffmpeg's 896x1024 preview being
            # substituted for an 8064x6048 original.
            if expected and sorted(img.size) != sorted(expected):
                sys.exit(f"ABORT: {name} decoded as {img.size}, source is {expected}. "
                         "Refusing to write a degraded photograph.")

            graded = grade(img, look)

            save_jpeg(graded, os.path.join(full_dir, f"{pid}.jpg"), args.full_quality, 0)

            scale = args.web_long_edge / max(graded.size)
            web = graded.resize(
                (max(1, round(graded.width * scale)), max(1, round(graded.height * scale))),
                Image.LANCZOS) if scale < 1 else graded
            save_jpeg(web, os.path.join(web_dir, f"{pid}.jpg"), args.web_quality, 0)

            fmb = os.path.getsize(os.path.join(full_dir, f"{pid}.jpg")) / 1048576
            wmb = os.path.getsize(os.path.join(web_dir, f"{pid}.jpg")) / 1048576
            manifest.append((pid, name, graded.size))
            print(f"  {pid}  {name:<20} {graded.size[0]}x{graded.size[1]}"
                  f"   full {fmb:5.1f} MB   web {wmb:4.1f} MB")

        total = sum(os.path.getsize(os.path.join(full_dir, f)) for f in os.listdir(full_dir))
        print(f"\nDone → {args.outdir}")
        print(f"  full/ total {total/1048576:.0f} MB  (this is the size of the 'download every photo' zip)")


if __name__ == "__main__":
    main()
