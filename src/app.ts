import express from "express";

const app = express();

// importe the routes from index.ts
import { authRouters } from "./routes";

// Middleware de base
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use(authRouters);

// Exemple : app.use('/api/users', userRoutes);

export default app;
