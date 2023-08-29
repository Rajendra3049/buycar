const mongoose = require("mongoose");
const dealerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const dealerModel = mongoose.model("Dealer", dealerSchema);

module.exports = { dealerModel };
