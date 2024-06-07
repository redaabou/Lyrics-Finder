import express from "express";
import { artistRoute } from "./routes";
const app = express();

// importe the routes from index.ts
import { authRouters } from "./routes";
import songRoutes from "./routes/song-routes";

import { newsletterRoute } from "./routes/newsletter-routes";
import { userRoutes } from "./routes/user-routes";
import adminRoutes from "./routes/admin-routes";

// Middleware de base
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/artist", artistRoute);
app.use("/song", songRoutes);
app.use("/api/admin", adminRoutes);
app.use(authRouters);
app.use("/newsletter", newsletterRoute);
app.use("/user", userRoutes);

// Exemple : app.use('/api/users', userRoutes);

export default app;
