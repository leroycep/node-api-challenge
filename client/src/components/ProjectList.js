import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Project from "./Project";

const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
      width: 45%;
  }
`;

function ProjectList({ projects }) {
  return (
    <div>
      <Link to="/projects/new">New Project</Link>
      <ListContainer>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </ListContainer>
    </div>
  );
}

export default ProjectList;
