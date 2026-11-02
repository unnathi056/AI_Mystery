import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "../app.js";
import { loadEnv } from "../config/env.js";

test("API root describes the service", async () => {
  const server = createApp().listen(0);
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const response = await fetch(`http://127.0.0.1:${address.port}/api`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).name, "AI Mystery Room API");
  } finally {
    server.close();
  }
});

test("unknown routes use the shared error response", async () => {
  const server = createApp().listen(0);
  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const response = await fetch(`http://127.0.0.1:${address.port}/missing`);
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error.code, "NOT_FOUND");
  } finally {
    server.close();
  }
});

test("backend configuration requires a MongoDB URI", () => {
  assert.throws(() => loadEnv({}), /MONGODB_URI/);
});
