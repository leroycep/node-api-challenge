import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route, useHistory } from "react-router-dom";
import styled from "styled-components";

import ProjectList from "./components/ProjectList";
import ProjectPage from "./components/ProjectPage";
import ProjectForm from "./components/ProjectForm";
import EditProject from "./components/EditProject";

const API = "http://localhost:10211/api";

const AppContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2%;
`;

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

  const putProject = (id, values) => {
    axios
      .put(`${API}/projects/${id}`, values)
      .then((res) => {
        const updated = res.data;
        setProjects(
          projects.map((project) =>
            project.id === updated.id ? updated : project
          )
        );
        history.push(`/projects/${res.data.id}`);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <AppContainer>
      {error && <div>{error}</div>}
      <Switch>
        <Route path="/projects/new">
          <ProjectForm onSubmit={addProject} />
        </Route>
        <Route path="/projects/:id/edit">
          <EditProject projects={projects} putProject={putProject} />
        </Route>
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/projects">
          <ProjectList projects={projects} />
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;
