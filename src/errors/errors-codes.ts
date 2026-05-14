export const ERROR_CODES = {
  UNAUTHORIZED: {
    statusCode: 401,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
  },
  FORBIDDEN: {
    statusCode: 403,
    code: "FORBIDDEN",
    message: "Forbidden",
  },

  BAD_REQUEST: {
    statusCode: 400,
    code: "BAD_REQUEST",
    message: "Bad Request",
  },
  INTERNAL: {
    statusCode: 500,
    code: "INTERNAL",
    message: "Internal Server Error",
  },

  VALIDATION_FAILED: {
    statusCode: 400,
    code: "VALIDATION_FAILED",
    message: "Validation failed for the provided data.",
  },
  ACCOUNT_ALREADY_EXISTS: {
    statusCode: 400,
    code: "ACCOUNT_ALREADY_EXISTS",
    message: "An account with the provided email already exists.",
  },
  ACCOUNT_NOT_FOUND: {
    statusCode: 404,
    code: "ACCOUNT_NOT_FOUND",
    message: "Account not found.",
  },
  ACCOUNT_EMAIL_PASS_INVALID: {
    statusCode: 400,
    code: "ACCOUNT_EMAIL_PASS_INVALID",
    message: "Invalid email or password.",
  },
};
