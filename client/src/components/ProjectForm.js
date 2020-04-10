import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  input {
    padding: 1%;
    margin: 1%;
  }
`;

const Labeled = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
      flex-grow: 1;
  }
`;

function ProjectForm({ defaultValues, onSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Labeled>
        Name
        <input ref={register} type="text" name="name" />
      </Labeled>
      <Labeled>
        Decription
        <input ref={register} type="text" name="description" />
      </Labeled>
      <input type="submit" />
    </Form>
  );
}

export default ProjectForm;
