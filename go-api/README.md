# go-api

A small Go HTTP API for managing lists and items. This repository has been simplified to not require a database by default — the app binds to the port specified in the `PORT` environment variable (defaults to `8080`) and exposes a simple health endpoint at `/`.
# go-api

A small Go HTTP API for managing lists and items. This repository is configured to run without requiring a database by default. The app reads the `PORT` environment variable (provided by DigitalOcean App Platform at runtime) and exposes a health endpoint at `/`.

## Quick start (local)

1. Install Go (1.18+).

2. Download dependencies:

```bash
go mod tidy
```

3. Run locally on port 8080:

```bash
# run locally on port 8080
PORT=8080 go run .
```

4. Verify health endpoint:

```bash
curl -i http://localhost:8080/
```

You should get HTTP 200 with body `OK`.

## Build and run

Build a production binary and run it:

```bash
go build -o go-api .
./go-api
```

The server will bind to the port defined by `PORT`, defaulting to `8080` when unset.

## API endpoints

- `GET /` — health check (200 OK)
- `GET /api/lists`
- `GET /api/lists/{id}`
- `POST /api/lists`
- `PUT /api/lists/{id}`
- `DELETE /api/lists/{id}`
- `GET /api/lists/{id}/items`
- `GET /api/items`
- `GET /api/items/{id}`
- `POST /api/items`
- `PUT /api/items/{id}`
- `DELETE /api/items/{id}`

Adjust calls to match your client.

## Environment variables

- `PORT` — HTTP listen port (optional; App Platform injects this automatically)

There are no required database environment variables in this configuration. If you re-enable database support later, set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.

## Deploying to DigitalOcean App Platform

- Using GitHub integration (recommended):
   - Connect the repository.
   - Build command: `mkdir -p bin && go build -o bin/go-api .`
   - Run command: `bin/go-api` (or `./bin/go-api`).
   - Health check: HTTP, path `/`, port `8080`.
   - Do NOT add `PORT` manually — App Platform sets it for you.

- Using a Docker container: ensure the container runs the binary and that the process reads `os.Getenv("PORT")`.

If DigitalOcean reports the built executable is `bin/go-api`, either set the App Spec `run_command` to `bin/go-api` or change your build command to produce the name the spec expects.

## Troubleshooting

- Check App Platform build and runtime logs for errors.
- If health checks fail, confirm `/` returns 200 and the server binds to `:$PORT`.
- If you removed local git and need to push to GitHub, reinitialize and push the repo:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-git-remote>
git push -u origin main
```

## Project structure

```
go-api/
├── database/          # optional DB helpers if re-enabled
├── handlers/          # HTTP handlers
├── models/            # data models
├── main.go            # application entry point
├── go.mod
└── go.sum
```

If you'd like, I can add a sample `Dockerfile` or a ready `app.yaml` for DigitalOcean App Platform.

