const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { routeLogger, notFoundHandler, globalErrorHandler } = require('./mids');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.static(path.join(__dirname, './doc')));
app.use(express.static(path.join(__dirname, './eventdoc')));

app.use(routeLogger);

app.use('/api', require('./api'));

app.get('/apidoc', (req, res) => {
  res.sendFile(path.join(__dirname, './doc/index.html'));
});

app.get('/eventdoc', (req, res) => {
  res.sendFile(path.join(__dirname, './eventdoc/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;