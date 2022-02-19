import axios from "axios";

import "../../personal/personal.scss";
import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

export const PersonalAdmin = () => {
    const [error,setError]= useState(false)
    const [loading, setLoading]= useState(true)
    const [data, setData]= useState('')

    function getDate(date){
      if(date == null)
          return "yyyy-mm-dd";

      return date.toString().substring(0, 4) + "-"
          + date.toString().substring(4, 6) + "-"
          + date.toString().substring(6, 8);
  }

    useEffect(()=>{
        getData();
        },[]);
    const getData= async ()=>{
        setError(false);
        try{
          const response= await axios.get('http://localhost:3001/userinfo', {
            params: {
                email: window.sessionStorage.getItem('email'),
                password: window.sessionStorage.getItem('password')
            }
        });

        if (response.data.length===0){
            setError(true);
            throw 'Empty response on get user info';
        }
          setData(response.data[0])

          setLoading(false)   
        
        }catch(error){
          
          console.log(error);
        }
      }
      if (error){
          return <ErrorComponent/>
      }
      if (loading){
          return <Loading/>
      }
  return (
    <div className='personal'>
        <h1>Your personal space</h1>
        <div className="info">
            <h2>Name</h2>
            {data.nome}
        </div>
        <div className="info">
            <h2>Surname</h2>
            {data.cognome}
        </div>
        <div className="info">
            <h2>Email</h2>
            {data.email}
        </div>
        <div className="info">
            <h2>Date of birth</h2>
            {getDate(data.datanascita)}
        </div>
    </div>
  )
}

const ErrorComponent= ()=> {
    return(<div><h2>Error...</h2></div>);
    
}

const Loading = ()=> {
    return(
      <div>
      <h2>Loading...</h2>
      </div>
    )
}
 