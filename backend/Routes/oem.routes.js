const express = require("express");
const { oemModel } = require("../models/oem.model");
const { userAuth } = require("../middlewares/userAuth");

const oemRoutes = express.Router();
oemRoutes.get("/all", async (req, res) => {
  try {
    const oemData = await oemModel.find();
    res.status(200).send(oemData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Error while fetching all data" });
  }
});

oemRoutes.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    let queryObject = {};
    const yearMatch = search.match(/\d{4}$/);
    if (yearMatch) {
      queryObject.year = parseInt(yearMatch[0]);
      queryObject.model = search.replace(yearMatch[0], "").trim();
    } else {
      queryObject.model = search;
    }

    const oemData = await oemModel.find({
      $and: [
        { model: { $regex: queryObject.model, $options: "i" } },
        queryObject.year ? { year: queryObject.year } : {},
      ],
    });

    res.status(200).send(oemData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = { oemRoutes };
