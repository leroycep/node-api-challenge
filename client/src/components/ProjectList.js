import React from "react";
import { Link } from "react-router-dom";

import Project from "./Project";

function ProjectList({ projects }) {
  return (
    <div>
      <Link to="/projects/new">New Project</Link>
      <div>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
