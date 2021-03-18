module.exports.createError = (message, param, msg) => {
  return {
    message,
    errors: [
      {
        param,
        msg,
      },
    ],
  };
};
