# R2 multipart upload

`wrangler r2 object put` refuses any file over 300 MiB — with `--file` and with
`--pipe`. The Lisa & Dale film (404 MiB) and photo zip (553 MiB) both exceed it.

This does a real multipart upload using the R2 binding from a Worker run via
`wrangler dev --remote`: the code executes on Cloudflare's edge against the
live bucket, but is reachable only through the authenticated local session, so
nothing is ever publicly deployed.

```bash
cd scripts/r2-multipart-upload
npx wrangler dev --remote --port 8799 --ip 127.0.0.1 &

python3 push.py /path/to/film.mp4 film/lisa-dale-film.mp4 video/mp4
python3 push.py /path/to/photos.zip lisa-and-dale-photos.zip application/zip

pkill -f "wrangler dev --remote"
```

Parts are 20 MiB (R2's minimum is 5 MiB; this stays well inside the Worker's
128 MiB memory budget). The client sets an explicit `User-Agent` because
Cloudflare answers Python's default `Python-urllib/3.x` with a 403.
