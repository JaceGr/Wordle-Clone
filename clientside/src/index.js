import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginTile from './LoginTile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={ <LoginTile create={false}/>  } />
      <Route path="/login" exact element={ <LoginTile create={false}/>  } />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


