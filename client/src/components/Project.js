import React from "react";

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
