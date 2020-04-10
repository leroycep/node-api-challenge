const express = require("express");

const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not retrieve projects data" });
    });
});

router.get("/:id", getProjectById, (req, res) => {
  res.status(200).json(req.project);
});

function getProjectById(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      req.project = project;
      next();
    })
    .catch((err) => {
      res.status(404).json({ error: "No project with the specified id" });
    });
}

module.exports = router;
