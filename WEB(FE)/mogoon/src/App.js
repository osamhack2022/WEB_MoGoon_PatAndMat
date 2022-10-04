import React, { Component } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

//components
import ScrollTop from './ScrollTop';
import Header from "./components/Header/Header"
import Specialty from "./components/Specialty/Specialty"
import Banner from './components/Banner';
import SpDetail from './components/Specialty/SpDetail';
import Login from './components/Account/Login';

//css
import './App.css';
import './css/Header.css';
import './css/Specialty.css';
import './css/Login.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTop/>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Specialty />}></Route>
            <Route path="/Specialty/" element={<Specialty />}></Route>
            <Route path="/Specialty/SpDetail/:SpName" element={<SpDetail />}></Route>
            <Route path="/Login/" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
