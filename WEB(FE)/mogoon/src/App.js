import React, { Component } from 'react';
import { useState } from 'react';

//components
import Header from "./components/Header/Header"
import Specialty from "./components/Specialty/Specialty"

//css
import './App.css';
import './css/Header.css';
import './css/Specialty.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <Specialty/>
      </div>
    </div>
  );
}
export default App;
