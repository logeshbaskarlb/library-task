import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBook, setError, setLoading } from "../Reducer/BookSlice";
import axios from "axios";
import BookRecord from "./BookRecord";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.app);
  const getData = async () => {
    try {
      dispatch(setLoading());
      const userDataResponse = await axios.get(
        "https://65615e6adcd355c08323c948.mockapi.io/users"
      );
      dispatch(setBook(userDataResponse.data));
    } catch (error) {
      console.log("error");
      dispatch(setError("Error fetching user data"));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        {books.map((book, index) => {
          return <BookRecord bookDeatails={book} key={index} />;
        })}
      </div>
    </div>
  );
};

export default AllBooks;
