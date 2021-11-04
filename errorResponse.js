async function errorResponse(err) {
  if (err.name === 'CastError') {
    return {
      statusCode: 404,
      message: `Resource not found`,
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return {
      statusCode: 400,
      message: `${Object.keys(err.keyValue)[0]} already exists.`,
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return {
      statusCode: 400,
      message: Object.values(err.errors).map((val) => val.message),
    };
  }
}
module.exports = errorResponse;