import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginTile from './login/LoginTile';
import Dashboard from './Dashboard';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
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

/**
 * 
 * @returns The GameGrid component with the path parameter {day} set as a prop
 */
const GameGridDay = () => {
    let { day } = useParams();
    return <GameGrid day={day}/>;
}

  ReactDOM.render(
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" exact element={ !isLoggedIn() ? <LoginTile create={false}/> : <Dashboard /> } />
        <Route path="/login" exact element={ <LoginTile create={false}/> } />
        <Route path="/wordle" exact element={ <GameGrid/>  } />
        <Route path="/wordle/:day" exact element={<GameGridDay/>} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );


