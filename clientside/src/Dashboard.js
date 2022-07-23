import './App.css';
import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [userName, setUser] = useState('');

    //state of logged in assumed positive
    //likely a useEffect to check if the user is logged in.
    
    // Assuming user is logged in the jwt will be accessable
    useEffect(() => {
            const token = localStorage.getItem('token');
            if(token) {
                setUser(token);
            }
            else {
                setUser("Not logged in");
            }
        }, []);


  return (
      <div>
        <div className="App-body">
            <h1>Dashboard</h1>
            <b>{userName}</b>
        </div>
      </div>
  );
}

export default Dashboard;
