export const handleError = (statusCode, message) => {
  const errorObj = new Error();
  errorObj.statusCode = statusCode;
  errorObj.message = message;
  return errorObj;
};
