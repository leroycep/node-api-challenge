import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function ProjectForm({ defaultValues, onSubmit }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} type="text" name="name" />
      <input ref={register} type="text" name="description" />
      <input type="submit" />
    </form>
  );
}

export default ProjectForm;
