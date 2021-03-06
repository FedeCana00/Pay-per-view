import React from 'react'
import axios from 'axios'
import './payment.scss'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Payment = () => {
  const navigate = useNavigate();
  const [cardnumber,setCardnumber]= useState('')
  const [titolare, setTitolare]=useState('')
  const [dataScadenza, setDataScadenza]=useState('')
  const [cvc, setCvc]=useState('')
  const [prezzo, setPrezzo]= useState('')
  const [errorMsg, setErrorMsg] = useState("");
  // used to show success message
  const [successMsg, setSuccessMsg] = useState("");
  // used to control the button click after submit
  const [controlSubmit, setControlSubmit] = useState(false);

  // get movies to buy from database
  const getMovieInfo= ()=>{
    axios.get('http://localhost:3001/film',{
            params: {
              id:window.sessionStorage.getItem('linkto')
            }
        }).then((response)=>{
          if (response.data.length > 0)
            setPrezzo(Math.round(response.data[0].prezzo * (100 - response.data[0].sconto)) / 100) 
        });
  }

  // execute only one time
  useEffect(()=>{
    getMovieInfo()
  },[])

  // submit payment from form
  async function submit(e){
    e.preventDefault();

    if(controlSubmit)
      return;

    setControlSubmit(true);

    // used to check the correct fillment
    let c = await checkFields();
    if(!c){
      setControlSubmit(false);
      return;
    }
    
    axios.post('http://localhost:3001/payment', {
      idFilm:window.sessionStorage.getItem('linkto'),
      idUser:window.sessionStorage.getItem('id'),
      prezzo:prezzo
        }).then((response)=>{
          if(response.status===201){
            setSuccessMsg("Buy was successful!");
            setTimeout(() => setSuccessMsg(""), 5000);
            navigate("/")
          }
          setControlSubmit(false);
        });
  }

  // check fields before insert into database
  // async function => in order to use key word await
  async function checkFields(){
    setErrorMsg("");
    let msg = "";
    
    if(cardnumber.length <= 0)
        msg += "Card number is empty! \n";
    if(titolare.length <= 0)
        msg += "Holder is empty!\n";
    if(cvc.length <= 0)
        msg += "CVC is empty!\n";
    else{
        // get request and wiat for the response
        const response = await axios.get("http://localhost:3001/alreadyowned", {
            params: {
                idFilm: window.sessionStorage.getItem('linkto'),
                idUser:window.sessionStorage.getItem('id')
            }
        });

        
          if(response.data.length > 0){
            msg += "Movie already owned!\n";
          }
    }

    if(isNaN(Date.parse(dataScadenza)))
        msg += "Date is wrong!\n";

    
    setErrorMsg(msg);

    // reset error message after 5 seconds
    setTimeout(() => setErrorMsg(""), 5000);
    
    return msg.length === 0;
  }

  return (
    <div className='payment'>
      <div className='form'>
        <div className="title">Payment</div>

        <div className='box_payment'>
          <div className='img'>
            <img src='/assets/payment.png' alt='payment'/>
          </div>

          <form className='creditcard' onSubmit={(event) => submit(event)}>
            <label>Card Number</label>
            <input type="text" pattern="[\d| ]{16,22}" placeholder="Card Number" onChange={(event) => {setCardnumber(event.target.value)}}/>
            <label>Holder name:</label>
            <input type="text" placeholder='Name' onChange={(event) => {setTitolare(event.target.value)}}/>
            <label>CVC:</label>
            <input type="text" pattern="\d{3,4}" placeholder='CVC' onChange={(event) => {setCvc(event.target.value)}}/>
          
            <label>Valid thru:</label>
            <input type="month" onChange={(event) => {setDataScadenza(event.target.value)}}/>
            <button type='submit'>Confirm</button>
          </form>
        </div>
      </div>

      <Snackbar open={errorMsg.length > 0} autoHideDuration={0} anchorOrigin={{vertical: 'bottom', horizontal:'center'}}>
        <Alert severity="error" sx={{ width: '100%' }}>
            {errorMsg}
        </Alert>
      </Snackbar>

      {/* Used to show success message */}
      <Snackbar open={successMsg.length > 0} autoHideDuration={0} anchorOrigin={{vertical: 'bottom', horizontal:'center'}}>
          <Alert severity="success" sx={{ width: '100%' }}>
              {successMsg}
          </Alert>
      </Snackbar>

    </div>
  )
}

export default Payment