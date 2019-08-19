const fs = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');

let mongodbUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@`;
mongodbUrl += `${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin&w=1`;
mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connect(
  mongodbUrl,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
);

const models = join(__dirname, './models');
fs.readdirSync(models)
  .filter((file) => ~file.indexOf('.js'))
  .forEach((file) => require(join(models, file)));
