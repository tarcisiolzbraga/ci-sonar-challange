const express = require("express");
const app = express();

app.use(express.json()); // para lidar com JSON no corpo das requisições

// Rota básica
app.get("/", (req, res) => {
  res.send("Hello, CI/CD!");
});

// Rota de saudação personalizada
app.get("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
}); 

// GET com parâmetro
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: `User ${id}` });
});

// POST
app.post("/user", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  res.status(201).json({ id: 1, name });
});

// PUT
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  res.json({ id, name });
});

// DELETE
app.delete("/user/:id", (req, res) => {
  res.status(204).send();
});

module.exports = app;
