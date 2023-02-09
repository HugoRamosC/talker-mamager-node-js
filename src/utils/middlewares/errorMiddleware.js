const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

const errorMiddleware = (error, _req, res, _next) => res
  .status(error.status || HTTP_INTERNAL_SERVER_ERROR_STATUS)
  .json({ message: error.message });

module.exports = errorMiddleware;