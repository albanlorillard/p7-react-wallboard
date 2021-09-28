const db = require("../db");
const Message = db.message;
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

exports.getMessages = (req, res) => {
    
  Message.findAll({
    order: [['createdAt', 'DESC']]
  }).then(messages => {
    res.status(200).send(messages);
  })


  };

exports.postMessage = (req, res) => {
  const authorization = req.headers["authorization"];
  const token = authorization.split(' ')[1];

  let userId;

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    userId = decoded.id;
  });

  Message.create({
    userId: userId,
    title: req.body.title,
    content: req.body.content,
  })

  res.status(200).send();

};