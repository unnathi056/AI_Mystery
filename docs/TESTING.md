# Testing

## Commands

Run from the repository root:

```sh
npm test
npm run typecheck
npm run build
```

Backend tests cover API metadata, shared not-found responses, and required environment configuration. Frontend tests cover empty-scenario validation and honest messaging while case generation is unavailable.

No MongoDB integration test or end-to-end test exists yet. The health endpoint's database-connected response requires a running MongoDB instance to verify manually.
