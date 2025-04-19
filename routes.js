const controller = require("./my.controller");
const { Router } = require("express");
const router = Router();
const myctrl = new controller();

router.get("/health", (req, res) => {
  res.status(200).send({ status: "Ok" });
});

router.post("/weather", async (req, res) => {
  try {
    const { city } = req.body;
    const resp = await myctrl.getCoordenadas(city);
    res.status(200).send(resp);
  } catch (error) {
    console.error("Ocurrio un error", error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
