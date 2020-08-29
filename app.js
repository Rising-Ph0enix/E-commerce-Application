const express = require('express');
const app = express();
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.listen(port, () => console.log('server started on port', port));

module.exports = app;

