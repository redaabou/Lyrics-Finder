import { Request, Response, NextFunction } from "express";

const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden. Admins only." });
  }
};

export { checkAdmin };
