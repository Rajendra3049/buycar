const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema({
  dealerId: mongoose.Schema.Types.ObjectId,
  odometer: Number,
  major_scratch: Boolean,
  original_paint: Boolean,
  accidents: Number,
  previous_buyers: Number,
  registration_place: String,
  image: String,
  title: String,
  description: String,
});

const inventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = { inventoryModel };
