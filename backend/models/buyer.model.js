const mongoose = require("mongoose");
const buyerSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  carId: mongoose.Schema.Types.ObjectId,
  dealerId: mongoose.Schema.Types.ObjectId,
});

const buyerModel = mongoose.model("Buyer", buyerSchema);

module.exports = { buyerModel };
