const mongoose = require("mongoose");
const buyerSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
  car_Id: mongoose.Schema.Types.ObjectId,
  dealer_Id: mongoose.Schema.Types.ObjectId,
});

const buyerModel = mongoose.model("Buyer", buyerSchema);

module.exports = { buyerModel };
