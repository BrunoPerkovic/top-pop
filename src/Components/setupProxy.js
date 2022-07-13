const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/chart", {
      target: "https://api.deezer.com",
      secure: false,
      changeOrigin: true,
      origin: "*",
    })
  );
};
