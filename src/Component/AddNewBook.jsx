import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import { createBook } from "../Reducer/BookSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closeAfter15 = (values) =>
    toast(`${values.title} has been added`, {
      type: toast.TYPE.SUCCESS,
      autoClose: 1500,
    });

  const formik = useFormik({
    initialValues: {
      title: "",
      isbn: "",
      dop: "",
      language: "",
      author: {
        name: "",
        age: "",
        bio: "",
      },
    },
    validate: (values) => {
      let errors = {};
      if (!values.title) {
        errors.title = "Title Required!";
      } else if (values.title.length < 3) {
        errors.title = "Title must be at least 3 characters long!";
      }
      if (!values.language) {
        errors.language = "Enter the language you used in book";
      }
      if (!values.isbn) {
        errors.isbn = "Enter the ISBN No";
      } else if (values.isbn.length > 3) {
        errors.isbn = "Length should be long !";
      }
      if (!values.author.name) {
        errors.author = {
          ...errors.author,
          name: "Enter the name",
        };
      }
      if (!values.author.age) {
        errors.author = {
          ...errors.author,
          age: "Age required",
        };
      }
      if (!values.author.bio) {
        errors.author = {
          ...errors.author,
          bio: "Write Something about you",
        };
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://65615e6adcd355c08323c948.mockapi.io/users",
          values
        );
        dispatch(createBook(response.data));
        navigate("/");
        closeAfter15(values);
      } catch (error) {
        console.error(error);
        if(error.response){
          alert(`Request failed with status ${error.response.status}`)
        }else{
          alert("An error occurred while making the request");
        }
      }
    },
  });

  return (
    <>
      <div className="container-fluid" >
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="row  ">
            <h2 className="h3 text-center text-dark fw-semibold">Books</h2>

            <div className="col-lg-5 mb-3">
            <label htmlFor="" className="form-label text-black fw-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="Enter title..."
              className="form-control col-6  "
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
            {
              // if error is not null, display the error message
              formik.getFieldMeta("title").touched && formik.errors.title ? (
                <p className="text-danger">{formik.errors.title}</p>
                ) : null
              }
              </div>
          </div>

          <div className="col-lg-5 mb-3">
            <label htmlFor="" className="form-label text-black fw-semibold">
              Language
            </label>
            <input
              type="language"
              placeholder="Enter Language..."
              className="form-control"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.getFieldMeta("language").touched &&
            formik.errors.language ? (
              <div className="text-danger">{formik.errors.language}</div>
            ) : null}
          </div>

          <div className="col-lg-5 mb-3">
            <label
              htmlFor=""
              className="form-label text-black fw-semiboldlabel"
            >
              ISBN
            </label>
            <br />
            <input
              placeholder="Enter ISBN number..."
              className="form-control"
              type="number"
              name="isbn"
              id=""
              maxLength={15}
              value={formik.values.isbn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.getFieldMeta("isbn").touched && formik.errors.isbn ? (
              <div className="text-danger">{formik.errors.isbn}</div>
            ) : null}
          </div>

          <div className="col-lg-5 mb-3">
            <label className=" form-label text-black fw-semibold">
              Date of Publication
            </label>
            <input
              type="date"
              className="form-control"
              name="dop"
              value={formik.values.dop}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.getFieldMeta("dop").touched && formik.errors.dop ? (
              <div className="text-danger">{formik.errors.dop}</div>
            ) : null}
          </div>

          <div className="row justify-content-center mt-4">
            <h2 className="h3 text-center text-dark fw-semibold">Author</h2>
            <div className="col-lg-5 mb-3">
              <label className="form-label text-black fw-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter Name..."
                className="form-control"
                name="author.name"
                value={formik.values.author.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.getFieldMeta("author.name").touched &&
              formik.errors.author?.name ? (
                <div className="text-danger">{formik.errors.author.name}</div>
              ) : null}
            </div>

            <div className="col-lg-5 mb-3">
              <label className="form-label text-black fw-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="author.age"
                value={formik.values.author.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.getFieldMeta("author.age").touched &&
              formik.errors.author?.age ? (
                <div className="text-danger">{formik.errors.author.age}</div>
              ) : null}
            </div>

            <div className="col-lg-5 mb-2">
              <label className="form-label text-black fw-semibold">
                Short bio
              </label>
              <textarea
                type="text"
                placeholder="Enter Somthing about the book..."
                className="form-control"
                name="author.bio"
                value={formik.values.author.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ resize: "none" }}
                cols={12}
                rows={2}
              ></textarea>
              {formik.getFieldMeta("author.bio").touched &&
              formik.errors.author?.bio ? (
                <div className="text-danger">{formik.errors.author.bio}</div>
              ) : null}
            </div>

            <div className="col-lg-52 text-center mt-4">
              <input
                type="submit"
                className="btn btn-primary px-5 col-lg-5 py-2"
                value={"Submit"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewBook;
