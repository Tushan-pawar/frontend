import React, {useState} from "react";

function InsertPosts() {
  const [title, setTitle] = useState('');
  const [pbody, setBody] = useState('');
  const [msg, setMsg] = useState('');

  const addPost = () => {
    let post = {
      'title': title,
      'body': pbody,
      'userId': 101,
    }
    fetch("https://jsonplaceholder.typicode.com/posts",
     {
      method: "POST",
      body: JSON.stringify(post),
    }, [])
        setMsg("Post inserted");
        return;
  };

  return (
    <div>
      {msg !==''?msg:''}
      <br />
      <label>Insert Username</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <br />< br />
      <label>Insert Password</label>
      <input type="text" onChange={(e) => setBody(e.target.value)} />
      <br />< br />
      <button onClick={addPost}>Add Post</button>
    </div>
  );
}

export default InsertPosts;
