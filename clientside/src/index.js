import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginTile from './login/LoginTile';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopBar from './navbar/NavBar';
import GameGrid from './wordle/GameGrid';

const isLoggedIn = () => {
  let token = localStorage.getItem('token')
  console.log('running', token)
  if(token) {
    return true;
  } else {
    return false;
  }
}

  ReactDOM.render(
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" exact element={ !isLoggedIn() ? <LoginTile create={false}/> : <Dashboard />  } />
        <Route path="/login" exact element={ <LoginTile create={false}/>  } />
        <Route path="/wordle" exact element={ <GameGrid/>  } />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );


