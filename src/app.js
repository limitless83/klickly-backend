const express = require('express');
const cors = require('cors');

require('./database');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/store')(app);
require('./routes/migrate')(app);
require('./routes/product')(app);

module.exports = app;
