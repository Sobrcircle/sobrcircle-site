#!/usr/bin/env bash
# Upload every Lisa & Dale asset to the R2 bucket the gallery reads from.
#
# Prerequisites (both are dashboard/terminal steps only you can do):
#   1. R2 enabled on the Cloudflare account
#   2. `npx wrangler login` re-run afterwards, so the token carries r2 scope
#
# Idempotent: re-running overwrites objects in place.
#
# Content-Type is set explicitly on every object. An object stored without one
# is served as application/octet-stream, and the film then silently refuses to
# play in Safari.

set -euo pipefail

BUCKET="${BUCKET:-lisadale-media}"
GRADED="${GRADED:-/tmp/graded}"
FILM="${FILM:-/tmp/WeddingLisaDale.mp4}"
POSTER="${POSTER:-public/lisadale/preview/film/poster.jpg}"
ZIP="${ZIP:-/tmp/lisa-and-dale-photos.zip}"

put() { # put <local-file> <key> <content-type>
  [ -f "$1" ] || { echo "  MISSING: $1" >&2; return 1; }
  npx wrangler r2 object put "$BUCKET/$2" --file "$1" --content-type "$3" --remote >/dev/null
  printf '  %-44s %6s MB\n' "$2" "$(( $(stat -f%z "$1") / 1048576 ))"
}

echo "Creating bucket $BUCKET (ignored if it already exists)…"
npx wrangler r2 bucket create "$BUCKET" 2>/dev/null || true

echo
echo "Film (remuxed original — bit-identical streams, MP4 container):"
put "$FILM"   "film/lisa-dale-film.mp4" video/mp4
put "$POSTER" "film/poster.jpg"         image/jpeg

echo
echo "Photographs — display copies (long edge 2400):"
for f in "$GRADED"/web/*.jpg; do
  put "$f" "photos/web/$(basename "$f")" image/jpeg
done

echo
echo "Photographs — full-resolution downloads:"
for f in "$GRADED"/full/*.jpg; do
  put "$f" "photos/full/$(basename "$f")" image/jpeg
done

echo
echo "Everything-in-one-download:"
put "$ZIP" "lisa-and-dale-photos.zip" application/zip

echo
echo "Done. Verify with:"
echo "  curl -sI https://sobrcircle.com/lisadale/media/photos/web/001.jpg"
