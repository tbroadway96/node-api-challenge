const express = require('express');
const actions = require('../data/helpers/actionModel');

const actionsRouter = express.Router();

//CREATE
actionsRouter.post('/:id/actions', async (req, res) => {
    const body = req.body;
    body.project_id = req.params.id;

    if (!body.description || !body.notes) {
        res.status(500).json({ message: 'You must provide a description and note.' });
    } else {
        try {
            const action = await actions.insert(body);
            if (action) {
                res.status(201).json(action);
            }
        }
        catch {
            res.status(500).json({ message: 'There was a problem saving the action.' });
        }
    }
})

//GET
actionsRouter.get('/:id/actions', async (req, res) => {
    const actionsList = await actions.get();
    if (!actionsList) {
        res.status(404).json({ message: 'No actions could be found for that project.' });
    } else {
        res.status(201).json(actionsList);
    }
})

//GET BY ID
actionsRouter.get('/:id/actions/:i', async (req, res) => {
    console.log(req.params);
    const id = req.params.id;

    const action = await actions.get(id);

    if (!action) {
        res.status(404).json({ message: 'There are no actions matching that ID.' });
    } else {
        res.status(201).json(action);
    }
})

//UPDATE
actionsRouter.put('/:id/actions/:i', async (req, res) => {
    const id = req.params.i;
    const description = req.body.description;
    const notes = req.body.notes;

    if (!description && !notes) {
        res.status(500).json({ message: 'Please provide either a description or note.' });
    } else {
        const updated = await actions.update(id, req.body);

        if (!updated) {
            res.status(404).json({ message: 'There was an issue with updating the action.' });
        } else {
            res.status(201).json(updated);
        }
    }
})

//DELETE
actionsRouter.delete('/:id/actions/:i', async (req, res) => {
    const id = req.params.i;

    const deleted = await actions.remove(id);

    if (!deleted) {
        res.status(404).json({ message: 'No action that matched the ID could be found.' });
    } else {
        res.status(201).json(`Deleted ${deleted} action(s).`);
    }
})

module.exports = actionsRouter;
