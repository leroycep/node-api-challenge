import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, useHistory } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import ProjectPage from "./components/ProjectPage";
import ProjectForm from "./components/ProjectForm";

const API = "http://localhost:10211/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const history = useHistory();

  const fetchProjects = () => {
    axios
      .get(`${API}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err));
  };

  const addProject = (project) => {
    axios
      .post(`${API}/projects`, project)
      .then((res) => {
        setProjects([...projects, res.data]);
        history.push(`/projects/${res.data.id}`);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <Switch>
        <Route path="/projects/new">
          <ProjectForm onSubmit={addProject} />
        </Route>
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/projects">
          <ProjectList projects={projects} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
