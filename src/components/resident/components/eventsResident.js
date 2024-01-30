import React, { Component } from 'react';
import axios from 'axios';

class EventsResident extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      currentPage: 0,
      totalPages: 0,
    };
  }

  fetchEvents = (page = 0, size = 4) => {
    axios
      .get(`http://localhost:8086/events/getallEvents?page=${page}&size=${size}`)
      .then((response) => {
        this.setState({
          events: response.data.content,
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
        });
      })
      .catch((error) => {
        console.error('Error fetching events: ', error);
      });
  };

  handlePageChange = (page) => {
    this.fetchEvents(page);
  };

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const { events, currentPage, totalPages } = this.state;

    return (
      <div className="container mt-4">  <img
      src="https://clipart-library.com/2023/44-440350_want-to-read-more-posts-like-this-check-out-smells-action-plan.png"
      className="img-fluid icon"
      alt="Icon"
      style={{ width: "250px", height: "250px" }}
    />
        <div className="card">
          <div className="card-body">
            <h1 className="mb-4 text-center">Events List</h1>

            <ul className="list-group">
              {events.map((event, index) => (
                <li key={index} className="list-group-item">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">{event.date}</h6>
                      <p className="card-text">{event.content} - {event.location}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-center mt-3">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => this.handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {(() => {
                    const pageItems = [];
                    for (let i = 0; i < totalPages; i++) {
                      pageItems.push(
                        <li
                          key={i}
                          className={`page-item ${currentPage === i ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => this.handlePageChange(i)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      );
                    }
                    return pageItems;
                  })()}

                  <li
                    className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                  >
                    <button
                      className="page-link"
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
    );
  }
}

export default EventsResident;
