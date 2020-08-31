import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";
import "../NoteForm.css";

export default function NoteForm(props) {
  const formik = useFormik({
    // To keep the values of the note when editing in the modal
    initialValues: props.initialValues,

    // Responsible for input validation
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .max(10, "Max number of characters")
        .required("Provide the title"),
      description: "",
      categories: "",
    }),

    // When submitted, the note will be passed as props and the form will be reset
    onSubmit: (values, { resetForm }) => {
      props.handleSubmittedNote(formik.values);
      resetForm({ values: "" });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <br></br>
      <br></br>

      <div className="div ">
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
      </div>
      <div className="div ">
        <select
          name="categories"
          placeholder="categories"
          onChange={formik.handleChange}
          value={formik.values.categories}
          hidden={props.disabled}
        >
          <option value="General">General</option>
          <option value="Computer Networks">Computer Networks</option>
          <option value="Digital Logic">Digital Logic</option>
          <option value="Data Structures">Data Structures</option>
        </select>
      </div>
      <div className="div ">
        <textarea
          name="description"
          type="text"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          rows="4"
          cols="40"
        />
      </div>
      <div>
        {formik.errors.title ? (
          <Alert color="primary">{formik.errors.title}</Alert>
        ) : (
          ""
        )}
      </div>
      <div className="div ">
        <button type="submit" onClick={formik.handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={formik.resetForm}>
          Reset
        </button>
        <button type="button" onClick={props.handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
