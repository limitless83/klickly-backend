const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
  },
});

mongoose.model('account', accountSchema);
