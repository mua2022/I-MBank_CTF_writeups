# InvisiTech — Asset API CTF: Step‑by‑step writeup

    *Starter*

> Another piece of InvisiTech Lab's internal tooling has surfaced.
>
> It looks like an asset management API, but the Docs never made it out of staging!
>
> Strangely enough, the system isn’t entirely silent - it drops hints in its errors, and some of the developer’s “oops” moments on GitHub might be more revealing than they thought.
>
> Your job? Piece together the endpoints, follow the breadcrumbs, read what the system whispers, and bring the right HTTP headers to prove you can get inside.
>
> **NOTE:** This challenge requires you to have a local installation of docker on your machine. An image is provided that you need to run locally on your device. The container runs on TCP port 5000 and can be accessed at `localhost:5000` after you have followed the steps below on "How to run the docker container"

---

## Goal

Capture the flag by discovering hidden API endpoints, following error hints, and presenting the correct header (`X-API-KEY`) to the supervisor endpoint.

---

## Prerequisites

* Docker installed and running locally.
* A terminal on Linux/macOS/WSL; or PowerShell on Windows.
* Optional: Burp Suite (proxy + Intruder) or ffuf/ffuf-like fuzzer and SecLists wordlists.

---

## How to run the Docker container

(As provided in the challenge)

```bash
# Step 1: Pull the image
docker pull n7es1/invisitech-inhouse:latest

# Step 2: Run the container (maps service to localhost:5000)
docker run -it -p 5000:5000 n7es1/invisitech-inhouse:latest

# Step 3: Access the API
# Open http://localhost:5000 or use curl
curl -i http://127.0.0.1:5000/
```

The app will answer on port `5000` on the host.

---

## Reconnaissance (manual checks)

1. Start with simple probes and look carefully at error messages — they *whisper* hints.

```bash
# Quick check root and common endpoints
curl -i http://127.0.0.1:5000/
curl -i http://127.0.0.1:5000/debug
curl -i http://127.0.0.1:5000/api/inventory
curl -i http://127.0.0.1:5000/api/analytics
```

You will see helpful error messages such as `405 Method Not Allowed` and text like `This endpoint only accepts POST requests.` — these tell you the expected method and where to focus fuzzing.

> **Rule of thumb:** read every error — error bodies often leak paths, expectations (POST vs GET), or auth hints.

---

## Fuzzing the `/api/` namespace

The app hinted that sibling paths to `/api/inventory` and `/api/analytics` exist. Use a wordlist to fuzz `/api/FUZZ` and discover hidden categories.

### Option A — `ffuf` (fast and suited for path fuzzing)

```bash
# example (replace wordlist path with your local SecLists or custom file)
ffuf -u http://127.0.0.1:5000/api/FUZZ -w ~/wordlists/api_endpoints.txt -mc 200,201,202,301,302,401,403 -fs 0
```

* `-mc` filters by status codes you find interesting.
* `-fs 0` filters out empty responses.

### Option B — Burp Suite Intruder (GUI)

1. Proxy a normal request to `/api/inventory` through Burp.
2. Right‑click → Send to Intruder.
3. In **Positions**, replace the `inventory` token with a single fuzz position `§inventory§`.
4. In **Payloads**, load your API wordlist (SecLists or your curated list).
5. Configure **Grep – Match** rules to catch non‑404 responses or specific JSON markers.
6. Launch attack and review results (look at status, response length, and response body).

* ![alt text](image-4.png)
*
* ![alt text](image-5.png)

---

## Narrowing down with targeted checks

Once a candidate endpoint is found (e.g. `/api/users`), test common subpaths by hand and watch for different responses or hints:

```bash
# Try GET/POST and check allowed methods
curl -i http://127.0.0.1:5000/api/users
curl -i -X POST http://127.0.0.1:5000/api/users -d '{}'

# Example: /api/users/supervisor returned an error and a hint to submit X-Api-Key
curl -i http://127.0.0.1:5000/api/users/supervisor
# -> "Method Not Allowed for Supervisor clearance request." and hint "Submit with correct X-Api-Key."
```

This tells you two things:

* The endpoint likely requires `POST`.
* The API expects an auth key in the `X-Api-Key` header.

---

## Hunting for the key (breadcrumbs)

Developers sometimes leave pointers in code or configuration. In this challenge we found a hex blob that decodes to a URL (a GitHub Gist) pointing to more hints.

* <https://github.com/InvisiTech-Labs/revamped-pipeline/notes/notes.md>

* ![alt text](image.png)

### Decode the key from HEX

* ![alt text](image-1.png)

The decoded string produced a URL like `https://gist.github.com/asciteam/217055bf5cb3874b69fcbe3e19bd99f5` — inspect the gist for an X-API key

* ![alt text](image-2.png)

## Using the discovered API key

Once you have the key (format: `inm-ctf-x-api-key-FwGorJZzdfC3QKgv4rKmw1zHCN7HSpSJOcKBjV1ceAhGbG3Sc4SbuLWpuo2l2XfPCRefjAo8q7QA2m`) call the supervisor endpoint with a `POST` and include the header.

A successful response returns `200` and a JSON body containing the flag.

### Python `requests` example

* ![alt text](image-3.png)

---

---

## Conclusion

Following the hints in the API errors, fuzzing the `/api/` namespace, decoding the developer-left hex link, and supplying the discovered `X-API-KEY` allowed us to gain supervisor access and capture the flag:

**Flag:** `flag{inm_api_endpoints_design_mastery}`

---
