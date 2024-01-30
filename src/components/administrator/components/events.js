import React, { Component } from "react";
import axios from "axios";

class EventsAdministrator extends Component {
  state = {
    content: "",
    date: "",
    location: "",
    events: [],
    currentPage: 0,
    totalPages: 0,
  };

  postEvents = () => {
    if (!this.state.content || !this.state.date || !this.state.location) {
      alert("Please fill in all fields.");
      return;
    }
    const eventsData = {
      content: this.state.content,
      date: this.state.date,
      location: this.state.location,
    };

    axios
      .post("http://localhost:8086/events/addEvents", eventsData)
      .then(() => {
        this.setState({
          content: "",
          date: "",
          location: "",
        });
        alert("Event Created Successfully");
        this.fetchEvents();
      })
      .catch(() => {
        alert("Issue in posting Event");
      });
  };

  fetchEvents = (page = 0, size = 4) => {
    axios
      .get(
        "http://localhost:8086/events/getallEvents?page=" +page +"&size=" + size )
      .then((response) => {
        this.setState({
          events: response.data.content,
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
        });
      })
      .catch(() => {
        alert("Error fetching events");
      });
  };

  componentDidMount() {
    this.fetchEvents();
  }

  handlePageChange = (page) => {
    this.fetchEvents(page);
  };

  render() {
    const { content, date, location, events, currentPage, totalPages } =
      this.state;

    return (
      <div className="container mt-5">
        <img
          src="https://clipart-library.com/2023/44-440350_want-to-read-more-posts-like-this-check-out-smells-action-plan.png"
          className="img-fluid icon"
          alt="Icon"
          style={{ width: "250px", height: "250px" }}
        />
        <h1>Create Events</h1>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Events</h5>

                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <input
                    type="text"
                    id="content"
                    className="form-control"
                    value={content}
                    onChange={(e) => this.setState({ content: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    value={location}
                    onChange={(e) =>
                      this.setState({ location: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Enter Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </div>

                <div className="text-center">
                  <button className="btn btn-primary" onClick={this.postEvents}>
                    Post Event
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Events List</h5>

                <ul className="list-group">
                  {events.map((event, index) => (
                    <li key={index} className="list-group-item">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-2 text-muted">
                            {event.date}
                          </h6>
                          <p className="card-text">
                            {event.content} - {event.location}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="text-center mt-3">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 0 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => this.handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => i).map(
                        (pageNumber) => (
                          <li
                            key={pageNumber}
                            className={`page-item ${
                              currentPage === pageNumber ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => this.handlePageChange(pageNumber)}
                            >
                              {pageNumber + 1}
                            </button>
                          </li>
                        )
                      )}

                      <li
                        className={`page-item ${
                          currentPage === totalPages - 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="btn btn-light mx-1"
                          onClick={() => this.handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsAdministrator;
