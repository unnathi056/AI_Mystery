# API

Base URL in development: `http://localhost:5000/api`.

## `GET /health`

Returns service and database status. HTTP 200 means MongoDB is connected; HTTP 503 means it is unavailable or connecting.

```json
{
  "status": "ok",
  "service": "ai-mystery-room-api",
  "database": "connected",
  "timestamp": "ISO-8601 timestamp"
}
```

## `GET /`

Returns API name and version.

## Errors

Unknown routes return HTTP 404 with `{ "error": { "code": "NOT_FOUND", "message": "Route not found." } }`. Unexpected errors use the shared HTTP 500 response and do not expose internal details.

## Planned endpoints

Investigation creation, retrieval, accusation, and reveal endpoints are not implemented. Before adding them, define schemas, persistence semantics, and response projections that prevent solution leakage. Correctness must be evaluated deterministically by the backend, and reveal explanations must use existing case evidence.
