import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PostComponent extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() { 
    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
 .then(response => this.setState({
  posts: response.data
      }));
  }

  render() {
    return (
      <div>
        <h1>All posts</h1>
        {
          this.state.posts.map((p, index) => 
         <div key={index} className="container">
         <h4>{index }.{p.name}</h4>
         <p>{p.body}</p>
         <Link to={'/posts/comments/'+ p.id}><button>View comments</button></Link>
         </div>
          )
        }
      </div>
    );
  }
}

export default PostComponent;
