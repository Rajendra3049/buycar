const express = require("express");
const { inventoryModel } = require("../models/inventory.model");
const { userAuth } = require("../middlewares/userAuth");

const inventoryRoutes = express.Router();
inventoryRoutes.get("/inventory", async (req, res) => {
  try {
    const inventoryData = await inventoryModel.find();
    res.status(200).send(inventoryData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Error while fetching all inventory data" });
  }
});

inventoryRoutes.get("/my-inventory", userAuth, async (req, res) => {
  const dealerId = req.body.dealerId;
  try {
    const cars = await inventoryModel.find({ dealerId });
    res.status(200).send(cars);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching your cars" });
  }
});

inventoryRoutes.post("/inventory", userAuth, async (req, res) => {
  try {
    const newCar = await inventoryModel.create(req.body);
    res.status(201).send({ msg: "created successfully", data: newCar });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while creating the new car data" });
  }
});

inventoryRoutes.patch("/inventory/:id", userAuth, async (req, res) => {
  const _id = req.params.id;
  const dealerId = req.body.dealerId;

  try {
    const car = await inventoryModel.findById(_id);

    if (!car) {
      return res.status(404).send({ error: "car not found" });
    }

    if (car.dealerId.toString() !== dealerId) {
      return res.status(403).send({ error: "Unauthorized to update this car" });
    }

    const updatedCar = await inventoryModel.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .send({ msg: "CarData updated successfully", car: updatedCar });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while updating the car" });
  }
});

inventoryRoutes.delete("/inventory/:id", userAuth, async (req, res) => {
  const _id = req.params.id;
  const dealerId = req.body.dealerId;

  try {
    const car = await inventoryModel.findById(_id);

    if (!car) {
      return res.status(404).send({ error: "car not found" });
    }

    if (car.dealerId.toString() !== dealerId) {
      return res.status(403).send({ error: "Unauthorized to delete this car" });
    }

    await inventoryModel.findByIdAndDelete(_id);
    res.status(200).send({ msg: "car deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the car" });
  }
});

inventoryRoutes.delete("/inventory", userAuth, async (req, res) => {
  const { ids, dealerId } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .send({ error: "Invalid input. Missing or empty 'ids' array." });
  }

  try {
    const cars = await inventoryModel.find({ _id: { $in: ids } });

    if (cars.length === 0) {
      return res
        .status(404)
        .send({ error: "No cars found with the provided IDs" });
    }

    const unauthorizedCars = cars.filter(
      (car) => car.dealerId.toString() !== dealerId
    );
    if (unauthorizedCars.length > 0) {
      return res
        .status(403)
        .send({ error: "Unauthorized to delete some cars" });
    }

    const deletedCars = await inventoryModel.deleteMany({ _id: { $in: ids } });
    res
      .status(200)
      .send({ msg: `${deletedCars.deletedCount} cars deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the cars" });
  }
});

module.exports = { inventoryRoutes };
