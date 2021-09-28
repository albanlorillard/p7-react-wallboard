const { authJwt } = require("../middleware");
const controller = require("../controllers/message");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/messages",
    [authJwt.verifyToken],
    controller.getMessages
  );


  app.post(
    "/api/message",
    [authJwt.verifyToken],
    controller.postMessage
  );
};
