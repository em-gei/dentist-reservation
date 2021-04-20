// Dependencies
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();
// API routes
const api = require('./api-routes');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', api);

// Set server port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port
server.listen(port, () => console.log(`API running on localhost:${port}`));