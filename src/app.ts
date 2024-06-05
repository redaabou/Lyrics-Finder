import express from "express";
import { artistRoute } from "./routes";
const app = express();

// importe the routes from index.ts
import { authRouters } from "./routes";
import songRoutes from './routes/song-routes';

// Middleware de base
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/artist", artistRoute);
app.use("/song", songRoutes);
app.use(authRouters);

// Exemple : app.use('/api/users', userRoutes);

export default app;
