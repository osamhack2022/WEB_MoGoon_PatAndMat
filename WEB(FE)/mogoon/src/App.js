import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // let [title, settitle] = useState(["강남 맛집", "진해 맛집", "을지로 맛집"]);
  // let [like, setlike] = useState(0);

  return (
    <div className="App">
      <div className='main-wrap'>
        <Banner type="육군" color="#b2e0a7" backImg="./WEB(FE)/mogoon/public/img/main/banner1.jpg" />
        <Banner type="해군" color="#c8b8ee" backImg="./WEB(FE)/mogoon/public/img/main/banner2.jpg" />
        <Banner type="공군" color="#b2e4dc" backImg="./WEB(FE)/mogoon/public/img/main/banner1.jpg" />
        <Banner type="해병대" color="#f0bba7" backImg="./WEB(FE)/mogoon/public/img/main/banner1.jpg" />
      </div>

    </div>
  );
}

//component
let Banner = (props) => {
  return (
    <div className='banner' onClick={()=>{

    }}>
      <div style={{ backgroundColor: props.backColor, 
        borderColor: props.borderColor, 
        color: props.color, 
        backgroundImage: `url(${props.backImg})` }}>{props.type}</div>
    </div>
  );

  Banner.defaultProps = {
    backgroundColor: "none",
    borderColor: "none", 
    color: "", 
  }
};



export default App;
