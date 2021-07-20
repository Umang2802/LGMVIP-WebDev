import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'
import Card from './components/Card/Card'
import Axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "react-loader-spinner";

function App() {

  const [clicked, setclicked] = useState(false);
  const [page1, setpage1] = useState(null);
  const [page2, setpage2] = useState(null)
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  const fetchUsers = () => {
    setSpinnerLoading(true)

    Axios.get("https://reqres.in/api/users?page=1").then(
      (response) => {
        setpage1(response.data.data);
      }
    )

    Axios.get("https://reqres.in/api/users?page=2").then(
      (response) => {
        setpage2(response.data.data);
        setSpinnerLoading(false)
      }
    )
  }
 
  
  useEffect(() => {
    clicked && fetchUsers();
  }, [clicked])

  return (
    <div className="App">
      <Navbar buttonclicked={setclicked}/>
      
      <div className="allcards">
        {page1 && page1.map((item) => {
          return <Card id={item.id} fname={item.first_name} lname={item.last_name} email={item.email} image={item.avatar}/>
        })}
        {page2 && page2.map((item) => {
          return <Card id={item.id} fname={item.first_name} lname={item.last_name} email={item.email} image={item.avatar}/>
        })}
      </div>
      <div style={{
       width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        visible={spinnerLoading}
      />
      </div>
      
    </div>
  );
}

export default App;