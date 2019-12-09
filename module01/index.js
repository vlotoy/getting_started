const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1 => req.query
//Route params = /users/1 => req.params
//Requet body = { "name": "Victor". "email": "victor.tostes@gmail.com" }

const users = ['Andrés','Victor','Marina'];

//Global Middleware
server.use((req, res, next) => {
  console.time(`Request`);
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  
  next();
  console.timeEnd(`Request`);
});

//Middleware for check if user exists
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required!" })
  }

  return next();
}

//Middleware to check user in array
function checkUserInArray (req, res, next) {
  const { index } = req.params;
  
  if (!users[index]) {
    return res.status(400).json({ error: "User does not exist!" })
  }

  return next();
}

//List all users
server.get("/users", (req, res) => {
  return res.json(users);
});

//Create user
server.post("/users", checkUserExists, (req,res) => {
  const { name } = req.body;

  users.push(name);
  
  return res.json(users);
});

//List user by id
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  
  return res.json(users[index]);
});

//Update user
server.put("/users/:index", checkUserExists, checkUserInArray, (req,res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//Delete user
server.delete("/users/:index", checkUserInArray, (req,res) =>{
  const { index } = req.params;

  users.splice(index,1);

  return res.send();
});

server.listen(3000);