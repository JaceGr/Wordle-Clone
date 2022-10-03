import '../App.css';
import './NavBar.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function TopBar() {
    // Have a prop representing whether the user is logged in set by isLoggedIn.

    //function that handles log out onClick
  const logout = () => {
    navigate("/")
  }
    //function that handles log in onClick

    //Function to return log out or log in button based on 
  const navigate = useNavigate();
  return (
      <div className="bar">
        <div onClick={() => {navigate("/")}} className="option option-left">Home</div>
        <div onClick={() => {navigate("/wordle")}} className="option">Wordle</div>
        <div onClick={() => {navigate("/login")}} className="option">Login</div>
        <div onClick={logout} className="option">Logout</div>
      </div>
      //Conditionally render log out or log in based on
  );
}

export default TopBar;
