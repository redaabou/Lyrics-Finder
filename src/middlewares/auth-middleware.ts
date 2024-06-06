import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Split "Bearer <token>" to get the token part
    console.log(token);

    jwt.verify(token, "secrut_Code", (err, decodedToken) => {
      if (err) {
        res.json({ message: "you are not authaniketed" });
      } else {
        console.log(decodedToken);

        next();
      }
    });
  } else {
    res.json({ message: "you are not authaniketed" });
  }
};

export { requireAuth };
