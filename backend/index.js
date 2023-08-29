const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { dealerRoutes } = require("./Routes/dealer.routes");
const { oemRoutes } = require("./Routes/oem.routes");
const { inventoryRoutes } = require("./Routes/inventory.routes");
const { buyerRoutes } = require("./Routes/buyer.routes");

const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/", inventoryRoutes);
app.use("/dealer", dealerRoutes);
app.use("/oem", oemRoutes);
app.use("/buyer", buyerRoutes);

app.listen(8000, async () => {
  await connection;
  console.log("working fine on port 8000");
});
