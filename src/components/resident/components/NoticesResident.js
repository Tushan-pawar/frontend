import React, { useState, useEffect } from "react";
import axios from "axios";

function NoticesResident() {
  const [noticePage, setNoticePage] = useState({
    content: [],
    totalPages: 0,
    number: 0,
    totalElements: 0,
  });

  const fetchNotices = (page = 0, size = 4) => {
    axios
      .get(`http://localhost:8086/notices/getallNotices?page=${page}&size=${size}`)
      .then((response) => {
        setNoticePage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices: ", error);
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="container mt-4"> <img
    src="https://clipart-library.com/2023/34-341267_programas-e-aC3A7C3B5es-action-plan-icon-png.png"
    className="img-fluid icon"
    alt="Icon"
    style={{ width: "250px", height: "250px" }}
  />
      <div className="card">
        <div className="card-body">
          <h1 className="mb-4 text-center">Notices List</h1>

          
          <ul className="list-group">
            {noticePage.content.map((notice, index) => (
              <li key={index} className="list-group-item">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      {notice.date}
                    </h6>
                    <p className="card-text">{notice.content}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-3">
            <button
              className="btn btn-light mx-1"
              onClick={() => fetchNotices(noticePage.number - 1)}
              disabled={noticePage.number === 0}
            >
              Previous
            </button>

            {[...Array(noticePage.totalPages).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn ${
                  pageNumber === noticePage.number
                    ? "btn-primary"
                    : "btn-light"
                } mx-1`}
                onClick={() => fetchNotices(pageNumber)}
              >
                {pageNumber + 1}
              </button>
            ))}

            <button
              className="btn btn-light mx-1"
              onClick={() => fetchNotices(noticePage.number + 1)}
              disabled={noticePage.number === noticePage.totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticesResident;
