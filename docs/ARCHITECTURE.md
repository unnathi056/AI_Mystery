# Architecture

## Current foundation

The React + TypeScript + Vite client provides landing and case setup routes. It currently validates the scenario locally and does not send it to an API. The Express + TypeScript service exposes API metadata and a health endpoint. Mongoose manages the MongoDB connection; no investigation model or mystery-generation route exists yet.

## Intended boundaries

- The browser will collect user input and display investigation data, but will never receive Gemini credentials or the canonical culprit.
- Express routes/controllers will validate requests and coordinate application services.
- MongoDB will persist generation jobs, canonical solutions, investigation data, accusations, and progress with solution fields protected from pre-reveal responses.
- AI services will generate structured content; application code will validate it and preserve a single canonical solution across stages.
- Media generation will use a separate adapter. Text-only and placeholder representations must be labeled honestly.

## Security

The API disables Express's identifying header, limits JSON request bodies to 32 KB, restricts CORS to the configured frontend origin, and reads configuration from backend environment variables. Authentication, authorization, rate limits, and production deployment controls are not implemented in this foundation.
