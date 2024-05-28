require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// database connection
connection();

// Routes
app.use("/api/users", userRoutes);
// Add a route to serve static files (photos and CVs)

app.get("/", (req, res) => {
  res.send("<h1>Working Fine</h1>");
});

app.listen(port, console.log(`Listening on port ${port}...`));
