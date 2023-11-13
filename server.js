const express = require("express");
const sql = require("mssql/msnodesqlv8");

const app = express();
app.use("/css", express.static("css"));
app.use("/script", express.static("script"));
app.use("/img", express.static("img"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  server: "PENPEN\\SQLSTD2019",
  database: "accounts",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Logout endpoint
app.get("/logout", (req, res) => {
  res.redirect("/");
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, pass } = req.body;

  const connection = new sql.ConnectionPool(config);
  connection.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else {
      const request = new sql.Request(connection);

      // Query to check username and password in the "users" table
      const userQuery = `SELECT * FROM dbo.users WHERE email = '${username}' AND password = '${pass}'`;

      // Query to check username and password in the "admin" table
      const adminQuery = `SELECT * FROM dbo.admin WHERE username = '${username}' AND pass = '${pass}'`;

      // Execute both queries in parallel
      Promise.all([
        request.query(userQuery),
        request.query(adminQuery)
      ]).then(([userResult, adminResult]) => {
        if (userResult.recordset.length > 0) {
          // Login as a regular user
          res.redirect("/dashboard.html");
        } else if (adminResult.recordset.length > 0) {
          // Login as an admin
          res.redirect("/dashboard.html");
        } else {
          // No matching user found in both tables
          res.redirect("/?error=1");
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).send("Server error");
      }).finally(() => {
        connection.close();
      });
    }
  });
});

app.post("/signup", (req, res) => {
  // Retrieve user data from the request body
  const { fname, lname, course, year, section, email, password } = req.body;

  // Create a connection pool and connect to the database
  const connection = new sql.ConnectionPool(config);
  connection.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    } else {
      const request = new sql.Request(connection);
      const query = `INSERT INTO dbo.users (fname, lname, course, year, section, email, password) 
                     VALUES ('${fname}', '${lname}', '${course}', '${year}', '${section}', '${email}', '${password}')`;

      request.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Server error");
        } else {
          console.log("Signup successful");
          res.send(`
            <script>
              alert("Signup successful!");
              window.location.href = "/login.html"; // Redirect to the login page after successful sign-up
            </script>
          `);
        }

        connection.close(); // Close the connection
      });
    }
  });
});


app.get("/login.html", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/dashboard.html", function (req, res) {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/votenow.html", function (req, res) {
  res.sendFile(__dirname + "/votenow.html");
});

app.listen(2000, function () {
  console.log("Server is running on port 2000");
});
