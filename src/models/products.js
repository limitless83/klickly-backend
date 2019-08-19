const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
    },
  },
  { strict: false },
);

mongoose.model('product', productSchema);
