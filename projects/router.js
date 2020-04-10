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

router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(`Failed to insert project: ${err}`);
      res.status(500).json({ error: "Could not insert project" });
    });
});

router.get("/:id", getProjectById, (req, res) => {
  res.status(200).json(req.project);
});

router.put("/:id", getProjectById, validateProjectChange, (req, res) => {
  Projects.update(req.project.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(`Failed to update project: ${err}`);
      res.status(500).json({ error: "Failed to update project" });
    });
});

router.delete("/:id", getProjectById, (req, res) => {
  Projects.remove(req.project.id)
    .then((num_deleted) => {
      if (num_deleted > 0) {
        res.status(200).json(req.project);
      } else {
        res.status(500).json({ error: "Failed to delete project" });
      }
    })
    .catch((err) => {
      console.log(`Failed to delete project: ${err}`);
      res.status(500).json({ error: "Failed to delete project" });
    });
});

function getProjectById(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (project !== null) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: "No project with the specified id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not retrieve projects data" });
    });
}

function validateProject(req, res, next) {
  if (req.body.name !== undefined && req.body.description !== undefined) {
    next();
  } else {
    res
      .status(400)
      .json({ error: "The fields 'name' and 'description' must be given" });
  }
}

function validateProjectChange(req, res, next) {
  if (
    req.body.name !== undefined ||
    req.body.description !== undefined ||
    req.body.completed !== undefined
  ) {
    next();
  } else {
    res.status(400).json({
      error:
        "One of the fields 'name', 'description', or 'completed' must be given",
    });
  }
}

module.exports = router;
