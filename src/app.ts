import express from "express";

const app = express();

// importe the routes from index.ts

// Middleware de base
app.use(express.json());

// Routes

// Exemple : app.use('/api/users', userRoutes);

export default app;
