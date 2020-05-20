const express = require('express');
const projects = require('../data/helpers/projectModel');

const projectsRouter = express.Router();

//CREATE
projectsRouter.post('/', async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if (!name || !description) {
        res.status(500).json({ message: 'You must include a name and description.' });
    } else {
        const project = await projects.insert(req.body);
        project 
            ? res.status(201).json(project) 
            : res.status(500).json({ message: 'There was a problem saving your project.' })
    }
})

//GET
projectsRouter.get('/', async (req, res) => {
    const projectList = await projects.get();
    projectList
        ? res.status(201).json(projectList)
        : res.status(404).json({ message: 'There was an issue with retrieving the projects.' })
})

//GET BY ID
projectsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const project = await projects.get(id);

    if (!project) {
        res.status(404).json({ message: 'A project with the id provided could not be found.' });
    } else {
        res.status(201).json(project);
    }
})

//UPDATE
projectsRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;

    if (!name && !description) {
        res.status(500).json({ message: 'You must include a name or description.' });
    } else {
        const updatedProj = await projects.update(id, req.body)
        if (!updatedProj) {
            res.status(404).json({ message: 'Could not find a project that matches the id provided.' });
        } else {
            res.status(201).json(updatedProj);
        }
    }
})

//DELETE
projectsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await projects.remove(id);

    if (!deleted) {
        res.status(500).json({ message: 'There was an issue with deleting the project.' });
    } else {
        res.status(201).json(`Deleted ${deleted} project(s).`);
    }
})

module.exports = projectsRouter;
