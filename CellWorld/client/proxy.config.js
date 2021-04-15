const DEFAULT = {
  "target": "https://localhost:44337",
  "secure": false,
  "ws": true,
  // "logLevel": "debug",
  "bypass": function (req, res, proxyOptions) {
      if (req.url.indexOf('.json') > -1) {
          return req.url;
      }
  }
};

const PROXY_CONFIG = {
  "/api/*": DEFAULT,
  "/signalr/*": DEFAULT,
  "/pivot/*": DEFAULT
};
module.exports = PROXY_CONFIG;
