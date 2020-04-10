import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, useParams } from "react-router-dom";

import Project from "./Project";

const API = "http://localhost:10211/api";

function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (project === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Project project={project} />
      <ul>
        {project.actions.map((action) => (
          <li key={action.id}>
            <code>{JSON.stringify(action)}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectPage;
