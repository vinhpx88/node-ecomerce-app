function handleError(err, res) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
      details: err.details || null,
    });
  }
  
  module.exports = handleError;
  