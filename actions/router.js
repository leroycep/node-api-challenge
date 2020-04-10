const express = require("express");

const Projects = require("../data/helpers/projectModel.js");
const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

router.post("/", validateAction, (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log(`Failed to insert action: ${err}`);
      res.status(500).json({ error: "Could not insert action" });
    });
});

router.get("/:id", getActionById, (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", getActionById, validateActionChange, (req, res) => {
  Actions.update(req.action.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(`Failed to update action: ${err}`);
      res.status(500).json({ error: "Failed to update action" });
    });
});

router.delete("/:id", getActionById, (req, res) => {
  Actions.remove(req.action.id)
    .then((num_deleted) => {
      if (num_deleted > 0) {
        res.status(200).json(req.action);
      } else {
        res.status(500).json({ error: "Failed to delete action" });
      }
    })
    .catch((err) => {
      console.log(`Failed to delete project: ${err}`);
      res.status(500).json({ error: "Failed to delete action" });
    });
});

function getActionById(req, res, next) {
  Actions.get(req.params.id)
    .then((action) => {
      if (action !== null) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ error: "No action with the specified id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not retrieve actions data" });
    });
}

function validateAction(req, res, next) {
  if (req.body.description === undefined || req.body.notes === undefined) {
    res
      .status(400)
      .json({ error: "The fields 'description' and 'notes' must be given" });
    return;
  }
  Projects.get(req.body.project_id)
    .then((project) => {
      if (project !== null) {
        req.project = project;
        next();
      } else {
        res
          .status(400)
          .json({ error: "No project exists with the specified id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not retrieve projects data" });
    });
}

function validateActionChange(req, res, next) {
  if (
    req.body.project_id === undefined &&
    (req.body.description !== undefined ||
      req.body.notes !== undefined ||
      req.body.completed !== undefined)
  ) {
    next();
  } else {
    if (req.body.project_id) {
      // TODO: consider if this should actually be a restriction
      res.status(400).json({
        error: "Action cannot be assigned to a different project",
      });
    } else {
      res.status(400).json({
        error:
          "One of the fields 'description', 'notes', or 'completed' must be given",
      });
    }
  }
}

module.exports = router;
