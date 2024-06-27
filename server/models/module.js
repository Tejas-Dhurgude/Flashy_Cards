const mongoose = require("mongoose");

const moduleSchema = mongoose.Schema({
  module: {
    type: String,
    required: true,
  },
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
