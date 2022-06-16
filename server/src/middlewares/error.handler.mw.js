module.exports = async (err, req, res, next) => {
  const statusError = err.status || 500;
  res.status(statusError).send({
    errors: [{ message: err.message || 'Internal Server Error' }],
  });
};
