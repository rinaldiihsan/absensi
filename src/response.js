const response = (statusCode, data, message, res) => {
  res.send(statusCode, {
    data,
    message,
  });
};

module.exports = response;
