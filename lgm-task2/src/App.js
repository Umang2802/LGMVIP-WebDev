import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'
import Card from './components/Card/Card'
import Loader from './components/Loader/Loader'
import Axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [clicked, setclicked] = useState(false);
  const [page1, setpage1] = useState(null);
  const [page2, setpage2] = useState(null)
  const [loading, setloading] = useState(false);

  const fetchUsers = () => {
    setloading(true)

    Axios.get("https://reqres.in/api/users?page=1").then(
      (response) => {
        setpage1(response.data.data);
      }
    )

    Axios.get("https://reqres.in/api/users?page=2").then(
      (response) => {
        setpage2(response.data.data);
        setloading(false)
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
      <Loader show={loading}/>
    </div>
  );
}

export default App;