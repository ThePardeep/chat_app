const Router = require("express").Router();
const MysqlConn = require("../Config/DataBase.js");
const Auth = require("../Config/Auth");

//@Route : "/group/insert"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/insert", Auth, (req, res) => {
  const { GroupName, GroupStatus, UniqueId, Created_By } = req.body;
  MysqlConn.query(
    `INSERT INTO chatgroup (Name,GroupId,Status,Created_By) values('${GroupName}','${UniqueId}','${GroupStatus}','${Created_By}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });
        return;
      }
      if (result.length <= 0) {
        res.status(200).json({
          error: true,
          msg: "Some Error Found"
        });
        return;
      }
      res.status(200).json({
        error: false,
        msg: "Success"
      });
      return;
    }
  );
});

//@Route : "/group/all"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/all", Auth, (req, res) => {
  const { Email } = req.body;
  MysqlConn.query(`SELECT * FROM chatgroup`, (err, result) => {
    if (err) {
      res.status(400).json({
        error: true,
        msg: "Some Technical Error"
      });
      return;
    }
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
  });
});

//@Route : "/group/enroll"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/enroll", (req, res) => {
  const { Email, GroupId } = req.body;

  MysqlConn.query(
    `SELECT * FROM enrollgroup WHERE Email='${Email}'`,
    (err, groups) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });
        return;
      }

      var isAlreadyExist = false;

      for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        if (Email === group.Email && GroupId === group.GroupId) {
          isAlreadyExist = true;
          break;
        }
      }

      if (isAlreadyExist) {
        res.status(200).json({
          error: true,
          msg: "Already Member"
        });
        return;
      }
      // INSERT NEW GROUP
      MysqlConn.query(
        `INSERT INTO enrollgroup (Email,GroupId) values('${Email}','${GroupId}')  `,
        (err, result) => {
          if (err) {
            res.status(400).json({
              error: true,
              msg: "Some Technical Error"
            });

            return;
          }

          res.status(200).json({
            error: false,
            msg: "Success"
          });
        }
      );
    }
  );
});

//@Route : "/group/user/all"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/user/all", (req, res) => {
  const Email = req.body.Email;
  MysqlConn.query(
    `SELECT chatgroup.GroupId,chatgroup.Name,chatgroup.Status, enrollgroup.GroupId,enrollgroup.Email FROM chatgroup INNER JOIN enrollgroup ON chatgroup.GroupId = enrollgroup.GroupId and enrollgroup.Email = '${Email}'`,
    (err, groups) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });
        return;
      }
      if (groups.length <= 0) {
        res.status(200).json({
          error: true,
          msg: "Group Not Exist"
        });
        return;
      }

      res.status(200).json({
        error: false,
        msg: "Success",
        groups
      });
    }
  );
});

//@Route : "/group/user/remove"
//@Route-Type : POST
//@Access : PRIVATE

Router.post("/user/remove", (req, res) => {
  const { GroupId, Email } = req.body;

  MysqlConn.query(
    `DELETE FROM enrollgroup WHERE GroupId='${GroupId}' and Email='${Email}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({
          error: true,
          msg: "Some Technical Error"
        });

        return;
      }

      res.status(200).json({
        error: false,
        msg: "Success"
      });
    }
  );
});

module.exports = Router;

// SELECT enrollgroup.GroupId,chatgroup.GroupId,chatgroup.Name FROM chatgroup LEFT JOIN enrollgroup ON  enrollgroup.Email = 'hardeep@gmail.com' and enrollgroup.GroupId <> chatgroup.GroupId;
