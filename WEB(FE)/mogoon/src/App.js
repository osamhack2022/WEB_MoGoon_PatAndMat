import React, { Component } from 'react';
import { useState } from 'react';
import axios from 'axios';

//components
import Header from "./components/Header/Header"
import Specialty from "./components/Specialty/Specialty"

//css
import './App.css';
import './css/Header.css';
import './css/Specialty.css';

// const axios = require('axios');

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
