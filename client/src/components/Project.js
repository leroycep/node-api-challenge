import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid black;
  margin: 10px;
  padding: 1% 1% 3%;
`;

function Project(props) {
  return (
    <Card>
      <h3>
        <Link to={`/projects/${props.project.id}`}>{props.project.name}</Link>{" "}
        <Link to={`/projects/${props.project.id}/edit`}>[edit]</Link>
      </h3>
      <p>{props.project.description}</p>
      {props.project.completed ? "Complete" : "Not yet complete"}
    </Card>
  );
}

export default Project;
