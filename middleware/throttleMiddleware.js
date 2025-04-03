let requestsCount = {};
const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 100; // max requests per minute per IP

exports.throttleMiddleware = (req, res, next) => {
  const userIp = req.ip;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!requestsCount[userIp]) {
    requestsCount[userIp] = [];
  }

  // remove timestamps older than WINDOW_SIZE
  requestsCount[userIp] = requestsCount[userIp].filter(
    (timestamp) => timestamp > currentTime - WINDOW_SIZE_IN_SECONDS
  );

  // push new timestamp
  requestsCount[userIp].push(currentTime);

  // check if limit exceeded
  if (requestsCount[userIp].length > MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  next();
};
