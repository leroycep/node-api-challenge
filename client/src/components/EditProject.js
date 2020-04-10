import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProjectForm from "./ProjectForm";

function EditProject({ projects, putProject }) {
  const { id } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    const idInt = parseInt(id);
    setProject(projects.find((p) => p.id === idInt));
  }, [id, projects]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectForm
      onSubmit={(values) => putProject(id, values)}
      defaultValues={project}
    />
  );
}

export default EditProject;
