import axios from "axios";
import Loading from "../loading/Loading";
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

  const MovieList =()=>{
    if (movieList.length!==0){
      return (
      <div className="my-movies">
        <h2>My movies</h2>
        <div className="movie-list">
          {movieList.map((d,key) => (
            <Link to={"/film/"+ d.id}>
              <div className="movie" key={key}>
                <img src={d.locandina} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </div>);
    } else{
      return <></>
    }
  }

// executed only one time
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
            setError(true);
            throw 'Empty response on get user info';
        }
          setData(response.data[0])

          if (response2.data.length===0){

            console.log('no movie owned')
        }
          setMovieList(response2.data)
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
        
        <MovieList/>

    </div>
  )
}

const ErrorComponent= ()=> {
    return(<div><h2>Error...</h2></div>);
}
 