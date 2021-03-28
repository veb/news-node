const jwt = require("jsonwebtoken");
const APP_SECRET = "sdhjd6uyj2h3ewsdh;;45;";

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (isNumber(req.userId)) {
    return req.userId;
  }

  if (req.headers) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not Authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
  isNumber,
};
