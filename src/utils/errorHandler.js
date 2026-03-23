const chalk = require("chalk");
const { logErrorToFile } = require("../logger/loggers/fileLogger");

const handleError = (res, status, message = "", req = null) => {
  console.error(chalk.red(message));
  
  // רישום שגיאות 400 ומעלה לקובץ
  if (status >= 400 && req) {
    logErrorToFile(status, message, req.originalUrl || req.url, req.method);
  }
  
  res.status(status).send(message);
};

const handleBadRequest = async (validator, error) => {
  const errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  return Promise.reject(error);
};

exports.handleError = handleError;
exports.handleBadRequest = handleBadRequest;
