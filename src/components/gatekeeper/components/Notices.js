import React, { useState, useEffect } from "react";
import axios from "axios";

function NoticesGatekeeper() {
  const [noticePage, setNoticePage] = useState({
    content: [],
    totalPages: "",
    number: "",
  });

  const [error, setError] = useState("");

  const fetchNotices = (page = 0, size = 4) => {
    axios
      .get(`http://localhost:8086/notices/getallNotices?page=${page}&size=${size}`)
      .then((response) => {
        setNoticePage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices: ", error);
        setError("Error fetching notices. Please try again.");
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="card-body">
      <div className="card text-center">
        <img
          src="https://clipart-library.com/2023/34-341267_programas-e-aC3A7C3B5es-action-plan-icon-png.png"
          className="img-fluid icon mx-auto d-block"
          alt="Icon"
          style={{ width: "250px", height: "250px" }}
        />
        <h1 className="card-title">Notices List</h1>
        <ul className="list-group">
          {noticePage.content.map((notice, index) => (
            <li key={index} className="list-group-item">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">{notice.date}</h6>
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

          {Array.from({ length: noticePage.totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`btn ${
                  pageNumber === noticePage.number + 1 ? "btn-primary" : "btn-light"
                } mx-1`}
                onClick={() => fetchNotices(pageNumber - 1)}
              >
                {pageNumber}
              </button>
            )
          )}

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
  );
}

export default NoticesGatekeeper;
