const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dealerModel } = require("../models/dealer.model");

const dealerRoutes = express.Router();

dealerRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let dealerFound = await dealerModel.findOne({ email: email });
    if (!dealerFound) {
      res.status(404).send({ msg: "dealer not found" });
    } else {
      bcrypt.compare(
        password,
        dealerFound.password,
        async function (err, result) {
          if (result) {
            try {
              const token = await jwt.sign(
                { foo: "bar", dealerId: dealerFound._id },
                "buyc",
                {
                  algorithm: "HS256",
                }
              );
              res.status(200).send({
                msg: "login successful",
                token,
                name: dealerFound.name,
              });
            } catch (error) {
              res
                .status(500)
                .send({ msg: "error while generating token", error });
            }
          } else {
            console.log(err);
            res.status(400).send({ msg: "error while login" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error while login", error: error });
  }
});

dealerRoutes.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let dealerFound = await dealerModel.findOne({ email });
    if (!dealerFound) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "error while hashing password" });
          return;
        }
        try {
          await dealerModel.create({
            name,
            email,
            password: hash,
          });
          res.status(200).send({ msg: "signup successful" });
        } catch (error) {
          console.log(error);
          res.status(500).send({ msg: "error while creating dealer", error });
        }
      });
    } else {
      res.status(400).send({ msg: "dealer already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "error in signup", error });
  }
});

module.exports = { dealerRoutes };
