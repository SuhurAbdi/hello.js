const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Middleware */
app.use(express.json());

// BONUS: Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* Serve static HTML */
app.use(express.static("public"));

/* Routes */

// GET /
app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
