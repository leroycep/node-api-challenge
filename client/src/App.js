import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import ProjectList from "./components/ProjectList";

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
      <Switch>
        <Route path="/projects">
          <ProjectList projects={projects} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
