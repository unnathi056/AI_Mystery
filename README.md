# AI Mystery Room

An AI-assisted interactive mystery investigation. This foundation includes a React interface and an Express API backed by MongoDB. Mystery generation and investigation workflows are not implemented yet; the create form reports this and does not save scenarios.

## Deploy to Render

The included [`render.yaml`](render.yaml) deploys the frontend and backend as one Node web service. MongoDB is hosted separately on MongoDB Atlas. The production server serves the built frontend and API from the same origin, so no frontend URL configuration is needed.

### 1. Push the project to GitHub

Create a GitHub repository, then push this project to its default branch. Do not commit `backend/.env`; it contains local settings and is ignored by Git.

### 2. Create a MongoDB Atlas database

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a free cluster.
2. Create a database user and save its password.
3. In **Network Access**, allow connections from `0.0.0.0/0` so Render can reach the cluster. Use a strong database password and keep it private.
4. Select **Connect → Drivers**, copy the connection string, and replace the password placeholder. Use a database name such as `ai-mystery-room` in the URI.

### 3. Create the Render service

1. Sign in to [Render](https://render.com) and choose **New → Blueprint**.
2. Connect the GitHub repository and select its default branch. Render reads `render.yaml` from the repository root.
3. When prompted, provide `MONGODB_URI` using the Atlas connection string. Keep it secret; do not put it in source control.
4. Create the Blueprint and wait for the build and deploy to finish.

### 4. Open and verify the app

Open the `onrender.com` URL shown for the service. Check `https://YOUR-SERVICE.onrender.com/api/health`; a healthy response reports the MongoDB connection as connected. The API and site share the same URL.

### 5. Deploy future changes

Push commits to the connected branch. Render will build and deploy them automatically.

## Run locally

Requirements: Node.js 20 or newer, npm, and a MongoDB instance.

```sh
npm ci
```

Copy `backend/.env.example` to `backend/.env`, set `MONGODB_URI`, then run:

```sh
npm run dev
```

The frontend is at `http://localhost:5173`; the backend is at `http://localhost:5000`. The Vite development server proxies `/api` requests to the backend.

## Build and checks

```sh
npm run typecheck
npm test
npm run build
```

The root `start` script starts the compiled backend. In production it also serves `frontend/dist`.
