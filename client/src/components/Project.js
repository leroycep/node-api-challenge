import React from "react";
import { Link } from "react-router-dom";

function Project(props) {
  return (
    <div>
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
      {props.project.completed ? "Complete" : "Not yet complete"}
    </div>
  );
}

export default Project;
