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
import Join from './components/Account/Join';
import Enlist from './components/Enlist/Enlist';

//css
import './App.css';
import './css/Header.css';
import './css/Specialty.css';

//redux
import { useDispatch } from "react-redux";
import { loginUser } from './reducer/userSlice';

function App() {
  const dispatch = useDispatch();

  if(localStorage.getItem("userInfo")!=null){
    dispatch(loginUser(localStorage.getItem("userInfo")));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTop />
        <Header />

        <div className='container'>
          <Routes>
            <Route path="/" element={<Specialty />}></Route>
            <Route path="/Account/Login" element={<Login />}></Route>
            <Route path="/Account/Join" element={<Join />}></Route>
            <Route path="/Specialty" element={<Specialty />}></Route>
            <Route path="/Specialty/list/:SpName/:Spkind" element={<SpDetail />}></Route>
            <Route path="/Enlist" element={<Enlist />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
