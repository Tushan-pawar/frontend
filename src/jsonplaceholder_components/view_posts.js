import React, { useEffect, useState } from 'react';

function ViewPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className='App'>
      <h1>API CALLS</h1>
      <hr />
      <hr />
      {posts.map((p, index) => (
        <div key={index}>
          <span style={{ fontFamily: "cursive" }}>{p.name}</span>,<br />
          {p.email}
        </div>
      ))}
    </div>
  );
}

export default ViewPosts;
