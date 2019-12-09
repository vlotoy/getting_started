const express = require('express');

const app = express();

app.use(express.json());

projects = [];

//Global middleware for count requisitons
app.use((req, res, next) => {
  console.count("Requisitions");
  next();
});

function checkIfProjectExists (req, res, next) {
  const { id } = req.params;
  //const project = projects.find(p => p.id == id);

  if(!projects[id]){
    res.status(400).json("Project does not exist!");
  }

  return next();
}

//List all projects
app.get('/projects', (req, res) => { 
  return res.json(projects);
});

//Create a project
app.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  }
  
  projects.push(project);

  return res.json(projects);

});

//Update project title by id
app.put('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  //const project = projects.find(p => p.id == id);

  projects[id].title = title;
  //project.title = title;

  return res.json(projects[id]);
});

//Delete project by id
app.delete('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  // const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(id, 1);
  //projects.splice(projectIndex,1);

  return res.send();

});

//Create tasks for a specific project
app.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  projects[id].tasks.push(tasks);

  return res.json(projects[id]);
});

app.listen(3333);