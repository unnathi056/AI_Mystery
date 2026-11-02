# AI Mystery Room

An AI-assisted interactive mystery investigation. The initial foundation provides the responsive React interface, a validated mystery setup form, and an Express API health endpoint backed by MongoDB connectivity. Mystery generation and investigation workflows are not implemented yet; the form clearly reports this and does not submit or save the scenario.

## Stack

- Frontend: React, TypeScript, Vite, React Router
- Backend: Node.js, Express, TypeScript, Mongoose
- Database: MongoDB
- Planned AI provider: Google Gemini (not connected in this foundation phase)

## Prerequisites

- Node.js 20 or newer and npm
- MongoDB running locally, or a MongoDB connection URI

## Setup

```sh
npm install
cp backend/.env.example backend/.env
```

Set `MONGODB_URI` in `backend/.env` to your MongoDB instance. The current foundation does not use the Gemini settings; no API key is needed until the AI generation phase.

## Run

From the repository root, start both services:

```sh
npm run dev
```

The frontend is at `http://localhost:5173`; the backend is at `http://localhost:5000`. You can also run `npm run dev -w frontend` or `npm run dev -w backend` separately.

Check API and database health at `http://localhost:5000/api/health`. It returns HTTP 200 only when MongoDB is connected, otherwise HTTP 503 with the connection state.

## Build and tests

```sh
npm run typecheck
npm test
npm run build
```

## Troubleshooting

- **Backend startup reports invalid configuration:** copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`.
- **MongoDB connection failure:** start MongoDB and confirm the URI and network access.
- **Address already in use:** stop the process using port 5000 or 5173.
- **Case creation says generation is not connected:** this is expected in the foundation phase. No fictional response is fabricated or persisted.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/API.md`](docs/API.md), [`docs/DATA_MODELS.md`](docs/DATA_MODELS.md), [`docs/AI_GENERATION.md`](docs/AI_GENERATION.md), and [`docs/TESTING.md`](docs/TESTING.md) for implementation contracts and current limitations.

The project requirements are in [`SPEC.md`](SPEC.md); it is copied from the supplied `.vscode/spec.md` and should be kept synchronized with it when requirements change.
