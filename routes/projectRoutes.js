const express = require('express');
const fixArrayId = require('../helpers');
const app = express.Router();

let projects = [
        {id: 1, title: "Faye's Cafe", img: "https://i.postimg.cc/wMk29r4J/fayescafe.png ", details: "This is an e-commerce website I created to sell savouries and sweet treats. It is a work in progress.", github: "https://github.com/amaarahjanuary/Fayes-Cafe.git ", live: "https://lucid-curie-f86e38.netlify.app/ "},
        {id: 2, title: "RED Store", img: "https://i.postimg.cc/5NNqwnk7/red.png ", details: "This is an e-commerce website I created to sell clothing and accessories that is relevant to Taylor Swift.", github: "https://github.com/amaarahjanuary/RED-Taylor-s-Version-.git", live: "https://app.netlify.com/sites/hardcore-almeida-b36fe4/overview"},
        {id: 3, title: "Pokemon API", img: "https://i.postimg.cc/2StwjhGH/pokemon.png ", details: "This is a website I created to display pokemon characters using the fetch function.", github: "https://github.com/amaarahjanuary/Pokemon-API.git", live: "https://gracious-curran-8d0210.netlify.app/"},
        {id: 4, title: "Calculator", img: "https://i.postimg.cc/1XDTwMC5/calculator.png", details: "This is a functional calculator i built using javascript for functionality and bootstrap and css for styling.", github: "https://github.com/amaarahjanuary/calculator.git", live: "https://affectionate-allen-e454b3.netlify.app/"}
        
];

app.get('/', (req, res) => {
    res.send(projects)
})

app.get('/:id', (req, res) => {
    const project = projects.find((project) => project.id == req.params.id) 
    if (!project) res.status(404).send({ msg: "Project not found"});
    res.send(project);
});

// CREATE A PROJECT (push to array)
app.post('/', (req, res) => { 
    let { title, img, details, github, live } = req.body;
    if (!title || !img || !details || !github || !live)
      res.status(400).send({ msg: "Not all information sent"});
    let newProject = {
        id: projects.length + 1,
        title,
        img,
        github,
        live,
    };
    projects.push(newProject);
    res.send(newProject);
});

// UPDATE A PROJECT (update item in array)
app.put("/:id", (req, res) => {
    // FIND PROJECT INDEX IN PROJECTS
    let project = projects.find((project) => project.id == req.params.id);
    if (!project) res.status(404).send({ msg: "Project not found" });
    let { title, img, github, netlify, stack } = req.body;

    // WRITE DETAILS TO PROJECT
    if (title) project.title = title;
    if (stack) project.stack = stack;
    if (github) project.github = github;
    if (netlify) project.netlify = netlify;
    if (img) project.img = img;
    res.send(project);
  });


app.delete('/:id', (req, res) => {
    projects = projects.filter((project) => project.id != req.params.id);
    fixArrayId(projects);
    res.send({ msg: 'Item removed' });
});

module.exports = app;