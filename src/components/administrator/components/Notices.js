import React, { useState, useEffect } from "react";
import axios from "axios";

function NoticesAdministrator() {
  const [noticeData, setNoticeData] = useState({
    content: "",
    date: "",
  });

  const [noticePage, setNoticePage] = useState({
    content: [],
    totalPages: "",
    number: "",
  });

  const [error, setError] = useState(null);

  const postNotices = () => {
    if (!noticeData.content || !noticeData.date) {
      alert("Please fill all fields.");
      return;
    }

    axios
      .post("http://localhost:8086/notices/addNotices", noticeData)
      .then((e) => {
        setNoticeData({
          content: "",
          date: "",
        });
        console.log({ msg: "Post Notice Success", e });
        alert("Notice Created Successfully");
        fetchNotices();
      })
      .catch((error) => {
        console.error({ msg: "Issue in posting Notice", error });
        setError("Error creating notice");
      });
  };

  const fetchNotices = (page = 0, size = 4) => {
    axios
      .get(
        `http://localhost:8086/notices/getallNotices?page=${page}&size=${size}`
      )
      .then((e) => {
        setNoticePage(e.data);
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
    <div className="container mt-5">
      {" "}
      <img
        src="https://clipart-library.com/2023/34-341267_programas-e-aC3A7C3B5es-action-plan-icon-png.png"
        className="img-fluid icon"
        alt="Icon"
        style={{ width: "250px", height: "250px" }}
      />{" "}
      <h1>Create Notices</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Notices</h5>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Enter Content
                </label>
                <input
                  type="text"
                  id="content"
                  className="form-control"
                  value={noticeData.content}
                  onChange={(e) =>
                    setNoticeData({ ...noticeData, content: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Enter Date{" "}
                </label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={noticeData.date}
                  onChange={(e) =>
                    setNoticeData({ ...noticeData, date: e.target.value })
                  }
                />
              </div>

              <div className="text-center">
                <button className="btn btn-primary" onClick={postNotices}>
                  Create Notice
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Notices List</h5>

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

                {Array.from(
                  { length: noticePage.totalPages },
                  (_, i) => i + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`btn ${
                      pageNumber === noticePage.number + 1
                        ? "btn-primary"
                        : "btn-light"
                    } mx-1`}
                    onClick={() => fetchNotices(pageNumber - 1)}
                  >
                    {pageNumber}
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
      </div>
    </div>
  );
}

export default NoticesAdministrator;
