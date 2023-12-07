import React from "react";
import { Link } from "react-router-dom";
import "react-bootstrap-icons";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black text-white py-1 mb-2">
      <div className="container-fluid px-2 px-lg-5">
        <i className="fa-solid fa-globe fa-2xl text-white mr-2"></i>
        <Link className="navbar-brand text-light d-flex justify-content-start">
          <h2 className="d-flex justify-content-start">
            <strong className="text-white ">Library</strong>
          </h2>
        </Link>

        <button
          className="navbar-toggler bg-info"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end g-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0 ms-lg-4 d-flex justify-content-end">
            <li className="nav-item  m-0 p-0">
              <Link className="nav-link text-white" to={"/"}>
               
                <h5><span>📖</span> Books</h5>
              </Link>
            </li>
            <li className="nav-item  m-0 p-0">
              <Link className="nav-link text-white" to={"/addbook"}>
               
                <h5><span>➕</span> Add Books</h5>
              </Link>
            </li>
            <li className="nav-item m-0 p-0">
              <Link className="nav-link text-white" to={"/allbooks"}>
               
                <h5 > <span>🔎</span>View All Books</h5>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
