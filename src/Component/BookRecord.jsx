import React from "react";

const BookRecord = ({ bookDeatails }) => {
  return (
    <>
      <div className="col-lg-4 mb-4">
        <div class="card h-100" style={{ width: "18rem" }}>
          <div class="card-body">
            <h2 class="card-title text-center mb-3">
              Title:
              {bookDeatails.title}
            </h2>
            <h6 class="card-text ">Author:{bookDeatails.author.name}</h6>
            <h6 class="card-text">ISBN number:{bookDeatails.isbn}</h6>
            <h6 class="card-text">Publication date:{bookDeatails.dop}</h6>

            <p className="card-text">
              <span className="fw-medium">Author bio</span>:{" "}
              {bookDeatails.author.bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookRecord;
