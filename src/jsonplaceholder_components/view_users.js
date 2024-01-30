import { useEffect, useState } from "react";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));

  }, []); 

  return (
    <div>
      {users.map((e, index) => 
        <div key={index}><span style={{fontFamily:"cursive"}}>
          Name: {e.name}<br />
          Username:{e.username}<br />
          Email: {e.email}<br />
          City: {e.address.city}<br />
          Zipcode:{e.address.zipcode}<br />
          Latitude: {e.address.geo.lat}<br/>
          Longitude:{e.address.geo.lng}<br/>
          Contact: {e.phone}<br />
          Company: {e.company.name}</span>
          <hr />
        </div>
      )}
    </div>
  );
}

export default ViewUsers;
