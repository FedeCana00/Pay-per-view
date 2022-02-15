import axios from "axios";
import "./personal.scss"
import React from 'react'
import {useState, useEffect} from 'react'

export const Personal = () => {
    const [error,setError]= useState(false)
    const [loading, setLoading]= useState(true)
    const [data, setData]= useState('')
    useEffect(()=>{
        getData()
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
            throw 'Empty response';
        }
          setData(response.data[0])
          setLoading(false)
          
        
        }catch(error){
          setError(true);
          console.log(error);
        }
      }
      if (error){
          return <ErrorComponent/>
      }
      if (loading){
          return <Loading/>
      }
      console.log(data)
  return (
    <div className='personal'>
        <h1>Il tuo spazio personale</h1>
        <div className="info">
            <h2>Nome</h2>
            {data.nome}
        </div>
        <div>
            <h2>Cognome</h2>
            {data.cognome}
        </div>
        <div>
            <h2>Email</h2>
            {data.email}
        </div>
        <div>
            <h2>Data di Nascita</h2>
            {data.datanascita}
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
