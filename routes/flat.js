const router = require("express").Router();
const cors = require("cors");
const Flat = require("../models/Flat");

//Create flat - @ http://localhost:3001/api/flat/create-new
router.post("/create-new", async (req, res) => {
  const flat = new Flat({
    flatName: req.body.flatName,
  });
  try {
    const saveFlat = await flat.save();
    res.send({flatSaved: saveFlat});
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get flat - @ http://localhost:3001/api/flat/flat-list
router.get("/flat-list", async (req, res) => {
  Flat.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
