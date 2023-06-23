import React, { useEffect, useState} from "react";

import '../styles/info.css'

const Info = () => {
    const [details, setDetails] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));

    async function getData() {
        await fetch(`http://localhost:3070/info/${user.userName}`)
            .then(response => response.json())
            .then(data => {
                setDetails(data);
            }).catch(err => alert(err))
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="user-card">
          <div className="user-header">
            <h2>{details.name}</h2>
            <p><strong>Username:</strong> {details.userName}</p>
          </div>
          <div className="user-body">
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Phone:</strong> {details.phone}</p>
            <p><strong>Website:</strong> {details.website}</p>
            <p><strong>Address:</strong> {details.address}</p>
            <p><strong>Company:</strong> {details.company}</p>
          </div>
        </div>
      );

}

export default Info;