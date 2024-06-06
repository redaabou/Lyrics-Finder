import jwt from "jsonwebtoken";
import { constrainedMemory } from "process";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Split "Bearer <token>" to get the token part
    jwt.verify(token, "secrut_Code", (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Unauthorized access. Please authenticate." });
      } else {
        const userId = decodedToken.id;
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized access. Please authenticate." });
  }
};

export { requireAuth };
