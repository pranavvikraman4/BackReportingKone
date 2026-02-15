import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d8538b0e/health", (c) => {
  return c.json({ status: "ok" });
});

// Save maintenance session
app.post("/make-server-d8538b0e/sessions", async (c) => {
  try {
    const session = await c.req.json();
    const key = `session:${session.id}`;
    await kv.set(key, JSON.stringify(session));
    return c.json({ success: true, id: session.id });
  } catch (error) {
    console.log(`Error saving session: ${error}`);
    return c.json({ error: `Failed to save session: ${error.message}` }, 500);
  }
});

// Get maintenance session by ID
app.get("/make-server-d8538b0e/sessions/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const key = `session:${id}`;
    const data = await kv.get(key);
    
    if (!data) {
      return c.json({ error: 'Session not found' }, 404);
    }
    
    return c.json(JSON.parse(data));
  } catch (error) {
    console.log(`Error retrieving session: ${error}`);
    return c.json({ error: `Failed to retrieve session: ${error.message}` }, 500);
  }
});

// Get all sessions for an elevator
app.get("/make-server-d8538b0e/elevators/:elevatorId/sessions", async (c) => {
  try {
    const elevatorId = c.req.param('elevatorId');
    const allSessions = await kv.getByPrefix('session:');
    
    const elevatorSessions = allSessions
      .map(s => JSON.parse(s))
      .filter(s => s.elevatorId === elevatorId)
      .sort((a, b) => b.startTime - a.startTime);
    
    return c.json(elevatorSessions);
  } catch (error) {
    console.log(`Error retrieving elevator sessions: ${error}`);
    return c.json({ error: `Failed to retrieve sessions: ${error.message}` }, 500);
  }
});

// Get all sessions for admin
app.get("/make-server-d8538b0e/sessions", async (c) => {
  try {
    const allSessions = await kv.getByPrefix('session:');
    const sessions = allSessions
      .map(s => JSON.parse(s))
      .sort((a, b) => b.startTime - a.startTime);
    
    return c.json(sessions);
  } catch (error) {
    console.log(`Error retrieving all sessions: ${error}`);
    return c.json({ error: `Failed to retrieve sessions: ${error.message}` }, 500);
  }
});

// Save elevator
app.post("/make-server-d8538b0e/elevators", async (c) => {
  try {
    const elevator = await c.req.json();
    const key = `elevator:${elevator.id}`;
    await kv.set(key, JSON.stringify(elevator));
    return c.json({ success: true, id: elevator.id });
  } catch (error) {
    console.log(`Error saving elevator: ${error}`);
    return c.json({ error: `Failed to save elevator: ${error.message}` }, 500);
  }
});

// Get all elevators
app.get("/make-server-d8538b0e/elevators", async (c) => {
  try {
    const allElevators = await kv.getByPrefix('elevator:');
    const elevators = allElevators.map(e => JSON.parse(e));
    return c.json(elevators);
  } catch (error) {
    console.log(`Error retrieving elevators: ${error}`);
    return c.json({ error: `Failed to retrieve elevators: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);