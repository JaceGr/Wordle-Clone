import './App.css';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

function LoginTile(props) {

  //Two buttons with onclick
    //on click will set the binary state variable of this form to be true and the other to false
    //login will be set to true by default

  const [create, setCreate] = useState(props.create);

  return (
    <div className="App">
      <header className="App-header">
        <LoginForm isCreate={create}/>
        <div>
          <button onClick={() => setCreate(true)}>
            Create Account
          </button>
          <button onClick={() => setCreate(false)}>
            Sign In
          </button>
        </div>
      </header>
      
    </div>
  );
}

export default LoginTile;
