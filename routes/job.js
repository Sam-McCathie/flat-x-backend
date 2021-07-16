const router = require("express").Router();
const Job = require("../models/Job");

//POST job - @ http://localhost:3001/api/job/create-new
router.post("/create-new", async (req, res) => {
  const job = new Job({
    job: req.body.job,
  });
  try {
    const saveJob = await job.save();
    res.send({jobSaved: saveJob});
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET job - @ http://localhost:3001/api/job/list
router.get("/list", async (req, res) => {
  Job.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
