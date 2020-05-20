const express = require('express');
const server = express();

const actionsRouter = require('./routers/actionsRouter');
const projectsRouter = require('./routers/projectsRouter');

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/projects', actionsRouter);

module.exports = server;
