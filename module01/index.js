const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1 => req.query
//Route params = /users/1 => req.params
//Requet body = { "name": "Victor". "email": "victor.tostes@gmail.com" }

const users = ['Andrés','Victor','Marina'];

//List all users
server.get("/users", (req, res) => {
  return res.json(users);
});

//Create user
server.post("/users", (req,res) => {
  const { name } = req.body;

  users.push(name);
  
  return res.json(users);
});

//List user by id
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  
  return res.json(users[index]);
});

//Update user
server.put("/users/:index", (req,res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.listen(3000);