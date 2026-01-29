require("dotenv").config();

const express = require("express");

const app = express();

//body parsing middleware
app.use(express.json());

let todos = [
  { id: 1, task: "learn node.js", completed: false },
  { id: 2, task: "build  crud api", completed: false },
];
app.get("/todos", (req, res) => {
  res.status(200).json(todos); //send array as json
});

//Post new -Createy
app.post("/todos", (req, res) => {
  const newTodo = { id: todos.length + 1, ...req.body }; //auto-ID
  todos.push(newTodo);
  res.status(201).json(newTodo); //Echo back
});

//PATCH Update-partial
app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); //Array.find()
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  Object.assign(todo, req.body); //Merge: e,g..{completed:true}
  res.status(200).json(todo);
});

//Delete Remove
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); //Array.filter() -non.destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: "Not Found" });
  res.status(204).send(); //Silent success
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});
