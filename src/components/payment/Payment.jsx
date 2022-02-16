import React from 'react'
import axios from 'axios'
import './payment.scss'
import { useState } from 'react'
const Payment = () => {
  const {cardnumber,setCardnumber}= useState('')
  const {titolare, setTitolare}=useState('')
  const {dataScadenza, setDataScadenza}=useState('')
  const {cvc, setCvc}=useState('')
  const submit=async (e)=>{
    e.preventDefault();
    const response= await axios.get('http://localhost:3001/userinfo', {
            params: {
                email: window.sessionStorage.getItem('email'),
                password: window.sessionStorage.getItem('password')
            }
        });

  }
  return (
    <div className='payment'>
      <div className='form'>
      <div className="title">Insert Credit Card info</div>
      <form className='creditcard' onSubmit={()=>submit()}>
        <label>Card Number</label>
        <input type="text" pattern="[\d| ]{16,22}" placeholder="Card Number" onChange={(event) => {setCardnumber(event.target.value)}}/>
        <label>Holder name:</label>
        <input type="text" placeholder='Name' onChange={(event) => {setTitolare(event.target.value)}}/>
        <label>CVC:</label>
        <input type="text" pattern="\d{3,4}" placeholder='CVC' onChange={(event) => {setCvc(event.target.value)}}/>
        
        <label>Valid thru:</label>
        <input type="month" onChange={(event) => {setDataScadenza(event.target.value)}}/>
        <button type='submit'>Conferma</button>
      </form>
        
      </div>
    </div>
  )
}

export default Payment