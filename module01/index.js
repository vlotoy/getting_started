const express = require('express');

const server = express();

//server.use()

//Query params = ?teste=1 => req.query
//Route params = /users/1 => req.params
//Requet body = { "name": "Victor". "email": "victor.tostes@gmail.com" }

const users = ['Andrés','Maria','Marina'];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  
  return res.json(users[index]);
});

server.listen(3000);