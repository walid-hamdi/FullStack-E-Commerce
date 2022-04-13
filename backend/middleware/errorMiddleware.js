const notFound = (req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.status(404);
  next(error);
};
const errorHandle = (error, req, res, next) => {
  const statusCode = error === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { notFound, errorHandle };
