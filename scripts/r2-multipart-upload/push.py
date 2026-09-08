import json, os, sys, urllib.request

BASE = "http://127.0.0.1:8799"
PART = 20 * 1024 * 1024  # 20 MiB — R2 minimum is 5 MiB; fits the Worker's 128 MiB budget

def call(path, query, data=None, ctype=None):
    q = "&".join(f"{k}={urllib.parse.quote(str(v))}" for k, v in query.items())
    req = urllib.request.Request(f"{BASE}{path}?{q}", data=data,
                                 method="PUT" if data is not None and path == "/part" else "POST")
    # Cloudflare rejects the default Python-urllib User-Agent with a 403.
    req.add_header("User-Agent", "lisadale-uploader/1.0")
    if ctype: req.add_header("Content-Type", ctype)
    with urllib.request.urlopen(req, timeout=600) as r:
        return json.loads(r.read())

def upload(local, key, ctype):
    size = os.path.getsize(local)
    total = (size + PART - 1) // PART
    print(f"{key}  {size/1048576:.0f} MB in {total} parts")
    uid = call("/begin", {"key": key, "ct": ctype})["uploadId"]
    parts = []
    with open(local, "rb") as f:
        for n in range(1, total + 1):
            chunk = f.read(PART)
            p = call("/part", {"key": key, "uploadId": uid, "part": n}, data=chunk)
            parts.append({"partNumber": p["partNumber"], "etag": p["etag"]})
            print(f"  part {n}/{total}", flush=True)
    done = call("/complete", {"key": key, "uploadId": uid},
                data=json.dumps(parts).encode(), ctype="application/json")
    print(f"  DONE {key}  {done['size']} bytes  etag {done['etag']}\n")
    return done["size"]

import urllib.parse
if __name__ == "__main__":
    upload(sys.argv[1], sys.argv[2], sys.argv[3])
