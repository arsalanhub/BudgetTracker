const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Persons", personSchema);
