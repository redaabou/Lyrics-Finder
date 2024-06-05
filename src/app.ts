import express from "express";
import {artistRoute} from "./routes"
const app = express();

// importe the routes from index.ts

// Middleware de base
app.use(express.json());

// Routes
app.use('/artist', artistRoute)
// Exemple : app.use('/api/users', userRoutes);

export default app;
