import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { editBook, setBook, setLoading } from "../Reducer/BookSlice";
import {toast} from 'react-toastify'

const EditBook = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeAfter15 = (title) => toast(`${title} is updated`, {  type: toast.TYPE.SUCCESS,autoClose: 2000 });
    
  const formik = useFormik({
    initialValues: {
      title: "",
      isbn: "",
      language: "",
      dop: "",
      author: {
        name: "",
        age: "",
        bio: "",
      },
    },
    validate:(values)=>{
        let errors = {};
        if (!values.title) {
            errors.title = "Please enter the User name";
          }
          if (!values.language) {
            errors.language = "Please enter the language of the book";
          }
       
          if (!values.isbn) {
            errors.isbn = "Please enter the ISBN No";
          } else if (values.isbn.toString().length !==4) {
            errors.isbn = "The ISBN must be exactly 4 digits";
          }
    
          if (!values.dop) {
            errors.dop = "Please enter the Date of Published";
          }
          
          if (!values.author.name) {
            errors.author = { ...errors.author, name: "Please enter the name" };
        }
    
        if (!values.author.age) {
            errors.author = { ...errors.author, age: "Please enter the Author DOB" };
        }
        
        if (!values.author.bio) {
            errors.author = { ...errors.author, bio: "Please enter the short bio-graphy about the athuor" };
        }
    
          return errors;   
    },onSubmit: async (values)=>{
        try{
            dispatch(setLoading());
            const response = await axios.put 
            (`https://65615e6adcd355c08323c948.mockapi.io/users/${params.id}`,values);
            dispatch(setBook(response.data));
            navigate('/')
            closeAfter15(values.title)
        }
        catch(errors){
            console.log("Error",errors)
        }
    }
  });

  useEffect(()=>{
    const getData = async()=>{
        try{
            const userData = await axios.get(
                `https://65615e6adcd355c08323c948.mockapi.io/users/${params.id}`
            )
            dispatch(editBook(userData.data))
            formik.setValues(userData.data);
        }catch(error){
            console.error(error);
        }
    };
    getData();
  },[])
  return (
    <>
      <div className="container-fluid">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="row justify-content-center">
            <h2 className="h3 text-center text-dark">Book</h2>
            <div className="col-lg-5 mb-3">
              <label htmlFor="" className="form-label text-black">
                Title:
              </label>
              <input
                type="text"
                name="title"
                id=""
                className="form-control"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                formik.getFieldMeta('title').touched && formik.errors.title ? 
                (<div className="text-danger"> {formik.errors.title}</div>):
                null
              }
            </div>
            <div className="col-lg-4 mb-3">
                <label htmlFor="" className="form-label text-black">
                    Language
                </label>
                <input type="language" name="" id=""  className="form-control"
                value={formik.values.language}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            
            <div className="col-lg-5 mb-3">
              <label className=" form-label text-black fw-semibold">ISBN</label>
              <input
                type="number"
                className="form-control"
                name="isbn"
                maxLength={10}
                value={formik.values.isbn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.getFieldMeta('isbn').touched && formik.errors.isbn?(
                <div className="text-danger">{formik.errors.isbn}</div>
              ):null}
            </div>
            <div className="col-lg-5 mb-3">
              <label className=" form-label text-black fw-semibold">Date of Publication</label>
              <input
                type="date"
                className="form-control"
                name="dop"
                value={formik.values.dop}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                          {formik.getFieldMeta('dop').touched && formik.errors.dop?(
                <div className="text-danger">{formik.errors.dop}</div>
              ):null}
            </div>
            </div>
            <div className="row justify-content-center mt-4">
            <h2 className="h3 text-center text-dark fw-semibold">Author</h2>
            <div className="col-lg-5 mb-3">
                  <label className="form-label text-black fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="author.name"
                    value={formik.values.author.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                 {formik.getFieldMeta('author.name').touched &&formik.errors.author?.name ? (
                    <div className="text-danger">{formik.errors.author.name}</div>
                  ):null}
                </div>
      
                <div className="col-lg-5 mb-3">
                  <label className="form-label text-black fw-semibold">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="author.age"
                    value={formik.values.author.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.getFieldMeta('author.age').touched &&formik.errors.author?.age ? (
                    <div className="text-danger">{formik.errors.author.age}</div>
                  ):null}
                </div>
      
                <div className="col-lg-5 mb-2">
                  <label className="form-label text-black fw-semibold">Short bio</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="author.bio"
                    value={formik.values.author.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{resize:'none'}}
                    cols={12}
                    rows={2}
                    >
                    </textarea>
                  {formik.getFieldMeta('author.bio').touched &&formik.errors.author?.bio ? (
                    <div className="text-danger">{formik.errors.author.bio}</div>
                  ):null}
                </div>
  
  
            <div className="col-lg-52 text-center mt-4">
              <input type="submit" className="btn btn-primary px-5 col-lg-5 py-2" value={"Submit"} />
            </div>
          </div>
        </form>
          </div>
    </>
  );
};

export default EditBook;
