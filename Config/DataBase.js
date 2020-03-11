const sql = require("mysql");
//MYSQL Connection
let Connection = null;
if (process.env.NODE_ENV === "production") {
  Connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.DU,
    password: process.env.DP,
    database: process.env.DATABASENAME
  });
} else {
  Connection = sql.createConnection({
    host: "localhost",
    user: "pardeep",
    password: "",
    database: "chatapp"
  });
}

Connection.connect(err => {
  if (err) throw err;
  console.log("DataBase Connected");
});
module.exports = Connection;
