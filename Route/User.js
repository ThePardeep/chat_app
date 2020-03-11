const Router = require("express").Router();
const MysqlConn = require("../Config/DataBase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../Config/Auth");

//@Route : "/user/login"
//@Route-Type : POST
//@Access : Public

Router.post("/signup", (req, res) => {
  const { Name, Email, Password } = req.body;

  // Check If Email AllREADY Exist
  MysqlConn.query("SELECT Email FROM user", (err, Emails, fields) => {
    if (err) {
      res.status(400).json({
        error: true,
        msg: "Some Technical Error"
      });
      return;
    }
    var UserExist = false;

    Emails.map(value => {
      if (Email === value.Email) {
        UserExist = true;
        return;
      }
    });
    if (UserExist) {
      res.status(200).json({
        error: true,
        msg: "Email AllReady Exist"
      });
      return;
    }
    //Insert New User
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(Password, salt, (err, hash) => {
        if (err) {
          res.status(400).json({
            error: true,
            msg: "Some Technical Error"
          });
          return;
        }

        MysqlConn.query(
          `INSERT INTO user (Name,Email,Password) values('${Name}','${Email}','${hash}')`,
          (err, result, fields) => {
            if (err) {
              res.status(400).json({
                error: true,
                msg: "Some DataBase Error"
              });
              return;
            }
            res.status(200).json({
              error: false,
              msg: "User Register Successfully"
            });
          }
        );
      });
    });
  });
});

//@Route : "/user/login"
//@Route-Type : POST
//@Access : Public

Router.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  MysqlConn.query(
    `SELECT * FROM user WHERE Email='${Email}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });
        return;
      }

      //IF USER EXIST
      if (result.length > 0) {
        //Check Password
        bcrypt.compare(Password, result[0].Password, (err, isSame) => {
          if (err) {
            res.status(400).json({
              error: true,
              msg: "Some Technical Error"
            });
            return;
          }
          //If Password is Correct

          if (isSame) {
            const Data = { Email: result[0].Email, Name: result[0].Name };
            jwt.sign(Data, "chatapp", { expiresIn: 3600 * 2 }, (err, token) => {
              if (err) {
                res.status(400).json({
                  error: true,
                  msg: "Some Technical Error"
                });
                return;
              }
              res.status(200).json({
                error: false,
                token: token,
                Email: result[0].Email,
                Name: result[0].Name
              });
            });

            return;
          }
          res.status(200).json({
            error: true,
            msg: "Password Is Not Correct"
          });
        });
        return;
      }
      //IF USER NOT EXIST
      res.status(200).json({
        error: true,
        msg: "User Not Exist"
      });
      return;
    }
  );
});

//@Route : "/user/profile"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/profile", Auth, (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token);
  res.status(200).json({
    error: false,
    user
  });
});

//@Route : "/user/token"
//@Route-Type : GET
//@Access : PRIVATE

Router.get("/token", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "chatapp", (err, decode) => {
    if (err) {
      res.status(200).json({
        error: true,
        msg: "Token Expire",
        err
      });
      return;
    }
    res.status(200).json({
      error: false
    });
  });
});

//@Route : "/user/group"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/group", (req, res) => {
  const { Email } = req.body;
  MysqlConn.query(
    `SELECT * FROM chatgroup WHERE Created_By='${Email}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });
        return;
      }

      //IF GROUP NOT EXIST
      if (result.length <= 0) {
        res.status(200).json({
          error: true,
          msg: "Group Not Exist"
        });
        return;
      }
      res.status(200).json({
        error: false,
        msg: "Success",
        result
      });
    }
  );
});

module.exports = Router;
