import React from "react";

import Project from "./Project";

function ProjectList({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
