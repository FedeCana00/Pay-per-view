import "./access.scss"
import { useState } from "react";
import axios from "axios";

export default function Access() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        axios.post("http://localhost:3001/createPerson", {
            name: name,
            surname: surname,
            email: email,
            birthDate: convertDateIntoInt(birthDate),
            username: username,
            password: password
        }).then(() => {
            console.log("Sign up successfully!");
        });
    };

    // remove "-" and convert to integer
    function convertDateIntoInt(date){
        return parseInt(date.replace("-", ""));
    }

    return (
        <div className="access" id="login">
            <div className="title">Log in</div>
            <div className="login">
                <label>Username:</label>
                <input type="text"/>
                <label>Password:</label>
                <input type="password"/>
                <button>Log in</button>
            </div>
            <div className="or">
                <hr/> OR <hr/>
            </div>
            <div className="title">Sign up</div>
            <div className="signup">
                <label>Name:</label>
                <input type="text" onChange={(event) => {setName(event.target.value)}}/>
                <label>Surname:</label>
                <input type="text" onChange={(event) => {setSurname(event.target.value)}}/>
                <label>Email:</label>
                <input type="email" onChange={(event) => {setEmail(event.target.value)}}/>
                <label>Birth date:</label>
                <input type="date" onChange={(event) => {setBirthDate(event.target.value)}}/>
                <label>Username:</label>
                <input type="text" onChange={(event) => {setUsername(event.target.value)}}/>
                <label>Password:</label>
                <input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
                <button onClick={signUp}>Sign up</button>
            </div>
        </div>
        );
}