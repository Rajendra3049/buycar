const express = require("express");
const { buyerModel } = require("../models/buyer.model");
const { userAuth } = require("../middlewares/userAuth");

const buyerRoutes = express.Router();
buyerRoutes.get("/", userAuth, async (req, res) => {
  const { dealerId } = req.body;
  try {
    const buyerData = await buyerModel.find({ dealerId });
    res.status(200).send(buyerData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Error while fetching buyer data" });
  }
});

module.exports = { buyerRoutes };
