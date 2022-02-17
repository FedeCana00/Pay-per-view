import "./access.scss"
import User from "../../class/User.jsx"
import { useState, useEffect } from "react";
import axios from "axios";
import { sha512 } from "js-sha512";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

export default function Access() {
    // used to change programmatically page
    const navigate = useNavigate();
    // log in useState
    const [lEmail, setLEmail] = useState("");
    const [lPassword, setLPassword] = useState("");

    // sign up useState
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");

    // used to show error message
    const [errorMsg, setErrorMsg] = useState("");
    // used to show success message
    const [successMsg, setSuccessMsg] = useState("");

    //handling error of buying without user signed in
    useEffect(()=>{
        console.log(window.sessionStorage.getItem('Error'))
        if(window.sessionStorage.getItem('Error')!=null){
            setErrorMsg(window.sessionStorage.getItem('Error'));
            window.sessionStorage.removeItem('Error')
            // reset error message after 5 seconds
            setTimeout(() => setErrorMsg(""), 5000);
        }
        },[]);
    const login = (e) => {
        e.preventDefault()
        // get request
        axios.get("http://localhost:3001/login", {
            params: {
                email: lEmail,
                password: lPassword
            }
        }).then((response) => {
            console.log(response.data.length);
            if(response.data.length > 0){
                setSuccessMsg("Logged in successfully!");
                const id= response.data[0].id
                const isAdmin=response.data[0].isAdmin
                // reset success message after 5 seconds
                setTimeout(() => setSuccessMsg(""), 5000);

                //TODO io creerei una classe con tutti i dati tranne la password (o con?), più la lista dei film
                saveEmailInSessionStorage();
                saveIdInSessionStorage(id);
                saveIsAdminIdInSessionStorage(isAdmin)
                savePasswordInSessionStorage()
                 // go to home page
                 if(window.sessionStorage.getItem('linkto')){
                    
                    navigate('/film/'+window.sessionStorage.getItem('linkto'));
                    window.sessionStorage.removeItem('linkto');
                 }
                 else{
                    navigate('/');
                 }
                
                // refresh page in order reload navabar component 
                // else not change element on the right
                window.location.reload();
            } else {
                setErrorMsg("Incorrect credentials entered!");

                // reset error message after 5 seconds
                setTimeout(() => setErrorMsg(""), 5000);
            }
        });
    };

    const signUp = (e) => {
        e.preventDefault()
        // check if fields are filled right
        if(!checkFields())
            return;

        // post request
        axios.post("http://localhost:3001/createPerson", {
            name: name,
            surname: surname,
            email: email,
            birthDate: convertDateIntoInt(birthDate),
            password: password
        }).then(() => {
            console.log("Sign up successfully!");
        });

        setSuccessMsg("Registration was successful!");

        // reset success message after 5 seconds
        setTimeout(() => setSuccessMsg(""), 5000);
    };

    // remove "-" and convert to integer
    function convertDateIntoInt(date){
        return parseInt(date.replaceAll("-", ""));
    }

    // check fields before insert into database
    function checkFields(){
        setErrorMsg("");
        let msg = "";
        
        if(name.length <= 0)
            msg += "Name is empty! \n";
        if(surname.length <= 0)
            msg += "Surname is empty!\n";
        if(email.length <= 0)
            msg += "Email is empty!\n";
        else{ // TODO: wait the response before show message
            // get request
            axios.get("http://localhost:3001/isUsernameInUse", {
                params: {
                    email: email
                }
            }).then((response) => {
                if(response.data !== undefined){
                    msg += "Email already in use!\n";
                }
            });
        }

        if(password.length <= 0)
            msg += "Password is empty!\n";
        if(isNaN(Date.parse(birthDate)))
            msg += "Date is wrong!\n";

        setErrorMsg(msg);

        // reset error message after 5 seconds
        setTimeout(() => setErrorMsg(""), 5000);

        return msg.length == 0;
    }

    // save email of user connected
    function saveEmailInSessionStorage(){
        window.sessionStorage.setItem('email', lEmail);      
    }
    function saveIsAdminIdInSessionStorage(isAdmin){
        window.sessionStorage.setItem('isAdmin', isAdmin);
    }
    function saveIdInSessionStorage(id){
        window.sessionStorage.setItem('id', id);
    }
    function savePasswordInSessionStorage(){
        window.sessionStorage.setItem('password', lPassword);
    }

    return (
        <div className="access" id="login">
            <div className="form">
                <div className="title">Log in</div>
                <form className="login" onSubmit={login}>
                    <label>Email:</label>
                    <input type="email" onChange={(event) => {setLEmail(event.target.value)}}/>
                    <label>Password:</label>
                    <input type="password" onChange={(event) => {setLPassword(sha512(event.target.value))}}/>
                    <button type='submit'>Log in</button>
                </form>
            </div>
            <div className="form">
                <div className="or">
                    <hr/> OR <hr/>
                </div>
            </div>
            <div className="form">
                <div className="title">Sign up</div>
                <form className="signup" onSubmit={signUp}>
                    <label>Name:</label>
                    <input type="text" onChange={(event) => {setName(event.target.value)}}/>
                    <label>Surname:</label>
                    <input type="text" onChange={(event) => {setSurname(event.target.value)}}/>
                    <label>Email:</label>
                    <input type="email" onChange={(event) => {setEmail(event.target.value)}}/>
                    <label>Birth date:</label>
                    <input type="date" onChange={(event) => {setBirthDate(event.target.value)}}/>
                    <label>Password:</label>
                    <input type="password" onChange={(event) => {setPassword(sha512(event.target.value))}}/>
                    <button type='submit'>Sign up</button>
                </form>
            </div>

            {/* Used to show error message */}
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
        );
}