const db = require("../db");
const User = db.user;
const config = require("../config/auth");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    console.log("t1")

User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  });
    
  console.log("t2")
res.send({ message: "User was registered successfully!" });
console.log("t3")

};

exports.signin = (req, res) => {
    
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

        res.status(200).send({
          id: user.id,
          username: user.username,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
