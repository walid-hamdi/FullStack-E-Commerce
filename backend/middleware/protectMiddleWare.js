import expressAsyncHandler from "express-async-handler";
import JWT from "jsonwebtoken";
import User from "../models/user.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      //   console.log(decoded);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("No user authorization, no token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No user authorization, no token");
  }
});

export { protect };
