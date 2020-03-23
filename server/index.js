const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post("/mytodos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO mytodo (description) VALUES($1) RETURNING * ",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// get a todo
app.get("/mytodos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM mytodo");

    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
app.get("/mytodos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM mytodo WHERE mytodo_id= $1", [
      id
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/mytodos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE mytodo SET description = $1 WHERE mytodo_id =$2",
      [description, id]
    );
    res.json("Todo was Updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/mytodos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM mytodo WHERE mytodo_id =$1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

//  port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server has started on port ${port}...`));
