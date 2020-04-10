import React, { useState, useEffect } from "react";
import axios from "axios";

import Project from "./components/Project";

const API = "http://localhost:10211/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const fetchProjects = () => {
    axios
      .get(`${API}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {error && <div>{JSON.stringify(error)}</div>}
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}

export default App;
