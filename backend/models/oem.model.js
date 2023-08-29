const mongoose = require("mongoose");
const oemSchema = mongoose.Schema({
  name: String,
  year: Number,
  price: Number,
  colors: Array,
  mileage: Number,
  power: Number,
  max_speed: Number,
});

const oemModel = mongoose.model("oem_spec", oemSchema);

module.exports = { oemModel };
