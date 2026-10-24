"""Draw the 1200x630 link-preview images for sobrcircle.com."""
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

SITE = 'public'  # run from the repo root
# Cormorant Garamond TTFs converted from public/lisadale/fonts/*.woff2 with fontTools
F = '/tmp/sobrcircle-fonts/'
INTER = '/usr/share/fonts/opentype/inter/'
W, H = 1200, 630
BG = (10, 10, 10)
TEXT = (232, 228, 223)
MUTED = (160, 154, 148)
ACCENT = (196, 168, 130)

serif = lambda s: ImageFont.truetype(F + 'cormorant-garamond-500.ttf', s)
serif_i = lambda s: ImageFont.truetype(F + 'cormorant-garamond-400-italic.ttf', s)
sans = lambda s, w='Regular': ImageFont.truetype(f'{INTER}Inter-{w}.otf', s)


def background():
    im = Image.new('RGB', (W, H), BG)
    glow = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(glow)
    d.ellipse((620, -120, 1320, 700), fill=38)
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    warm = Image.new('RGB', (W, H), (60, 48, 32))
    return Image.composite(warm, im, glow)


def ring(size):
    r = Image.open(SITE + '/assets/circle.png').convert('RGBA')
    r = r.crop(r.getbbox())
    a = r.split()[-1]
    rgb = ImageOps.invert(r.convert('RGB')).point(lambda v: int(v * 0.8))
    r = Image.merge('RGBA', (*rgb.split(), a))
    return r.resize((size, size), Image.LANCZOS)


def phone(src, height):
    shot = Image.open(SITE + '/assets/' + src).convert('RGB')
    pad, radius = 9, 40
    inner_h = height - 2 * pad
    inner_w = round(shot.width * inner_h / shot.height)
    shot = shot.resize((inner_w, inner_h), Image.LANCZOS)
    w = inner_w + 2 * pad
    body = Image.new('RGBA', (w, height), (0, 0, 0, 0))
    d = ImageDraw.Draw(body)
    d.rounded_rectangle((0, 0, w - 1, height - 1), radius=radius, fill=(22, 22, 22, 255), outline=(70, 70, 70, 255), width=2)
    mask = Image.new('L', shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, inner_w - 1, inner_h - 1), radius=radius - 8, fill=255)
    body.paste(shot, (pad, pad), mask)
    shadow = Image.new('RGBA', (w + 120, height + 120), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((60, 70, w + 60, height + 60), radius=radius, fill=(0, 0, 0, 200))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    shadow.alpha_composite(body, (60, 60))
    return shadow


def wordmark(d, x, y, size):
    bold, light = sans(size, 'Bold'), sans(size, 'Light')
    d.text((x, y), 'Sobr', font=bold, fill=TEXT)
    d.text((x + d.textlength('Sobr', font=bold), y), 'Circle', font=light, fill=TEXT)


def draw(out, headline, sub, features, shot):
    im = background().convert('RGBA')
    p = phone(shot, 540)
    im.alpha_composite(p, (W - p.width + 10, (H - p.height) // 2 + 6))
    d = ImageDraw.Draw(im)
    x = 76
    im.alpha_composite(ring(54), (x, 70))
    wordmark(d, x + 70, 80, 30)
    y = 168
    for line in headline:
        d.text((x, y), line, font=serif(62), fill=TEXT)
        y += 68
    y += 26
    for line in sub:
        d.text((x, y), line, font=sans(24), fill=MUTED)
        y += 34
    y += 22
    fx = x
    for i, f in enumerate(features):
        if i:
            d.text((fx, y), '·', font=sans(22, 'Medium'), fill=ACCENT)
            fx += 24
        d.text((fx, y), f, font=sans(22, 'Medium'), fill=ACCENT)
        fx += d.textlength(f, font=sans(22, 'Medium')) + 12
    d.text((x, H - 70), 'sobrcircle.com', font=sans(22, 'SemiBold'), fill=TEXT)
    im.convert('RGB').save(out, optimize=True)
    return fx


if __name__ == '__main__':
    print(draw(SITE + '/assets/og-share.png',
               ['The sobriety app built', 'by someone in recovery.'],
               ['Count your days, find a meeting tonight,', 'and stay close to the people who show up.'],
               ['Sobriety tracker', '195,000+ meetings', 'Rooms and events'],
               '1.webp'))
    print(draw(SITE + '/assets/og-meetings.png',
               ['Find recovery meetings', 'near you, tonight.'],
               ['195,000+ meetings, including AA, NA and CA,', 'with times and live navigation to the door.'],
               ['Drive', 'Walk', 'Bike', 'Transit'],
               '6.webp'))
