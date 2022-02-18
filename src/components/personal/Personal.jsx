import axios from "axios";

import "./personal.scss"
import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

export const Personal = () => {
    const [error,setError]= useState(false)
    const [loading, setLoading]= useState(true)
    const [data, setData]= useState('')
    const [movieList, setMovieList]= useState('')

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
        const response2= await axios.get('http://localhost:3001/userinventory', {
          params: {
              id: window.sessionStorage.getItem('id')
          }
      });
        if (response.data.length===0){
            throw 'Empty response on get user info';
        }
          setData(response.data[0])

          if (response2.data.length===0){
            throw 'Empty response on get movie list';
        }
          setMovieList(response2.data)
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
            {getDate(data.datanascita)}
        </div>
        <div>
            <h2>Movie List</h2>
            {movieList.map((d,key) => (
                    <div key={key}>
                  <Link to={"/film/"+ d.id}>
                    <button>
                    {d.nome}
                    </button>
                </Link>

                    </div>
                ))}
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
