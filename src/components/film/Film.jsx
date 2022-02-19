import "./film.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Film(){
    const navigate= useNavigate()
 
    
    const [film, setFilm] = useState([]);
    // used to get the id passed from the url
    const { id } = useParams()
    const[bought, setBought] =useState(0)
        // convert int date into readable string date
    function getDate(date){
        if(date == null)
            return "yyyy-mm-dd";

        return date.toString().substring(0, 4) + "-"
            + date.toString().substring(4, 6) + "-"
            + date.toString().substring(6, 8);
    }
    // execute only one time
    useEffect(() => {
        window.sessionStorage.removeItem('linkto');
        axios.get("http://localhost:3001/film", {
            params: {
                id: id
            }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else{
                if(response.data.length > 0)
                    setFilm(response.data[0]);
                else
                    // film not exists
                    setFilm({
                        id: -1,
                        nome: "",
                        datauscita: "",
                        locandina: "https://cdn-icons.flaticon.com/png/512/4020/premium/4020972.png?token=exp=1644857222~hmac=392f864b47c7fd14ed305050d6624259",
                        durata: 0,
                        genere: "",
                        trama: "",
                        prezzo: 0
                
                    });
            }
        });
        if (window.sessionStorage.getItem('id')!==null){
            axios.get("http://localhost:3001/alreadyowned",{
                params:{
                    idFilm: id,
                    idUser:window.sessionStorage.getItem('id')
                }
            }).then((response)=>{
                if(response.data === null)
                    setBought(0)
                else setBought(1)
            })
        }
        
    }, []);
    const setSessionstorage=()=>{
        window.sessionStorage.setItem('linkto',id);
    }
    const checkLogin= ()=>{
        if(window.sessionStorage.getItem('email') === null && window.sessionStorage.getItem('password') === null){
            window.sessionStorage.setItem('Error','Please, sign in before buying');
            return<Link to="/access">
                <button onClick={()=>setSessionstorage()}>Buy in 4k {Math.round(film.prezzo * (100 - film.sconto)) / 100} €</button>
                </Link>
        }
        else if (bought===0){
            
            return (
                <Link to="/payment">
                    <button onClick={()=>setSessionstorage()}>Buy in 4k {Math.round(film.prezzo * (100 - film.sconto)) / 100} €</button>
                </Link>
            );
        }
        else{
            return<a href={"http://localhost:3001/getfile?id="+film.id}>Download the Movie</a>

        }
    }

    // used to show discount badge if is different from 0
    function showDiscount(){
        if(film.sconto != 0)
            return (
                <div className="discount">
                    <div className="title"><b>Discount:</b></div>
                    <div className="text">- {film.sconto} %</div>
                </div>
            );
    }
 
    return (
        <div className="film">
            <div className="top">
                <div className="left">
                    <img src={film.locandina} alt=""/>
                </div>
                <div className="right">
                    <div className="title">{film.nome}</div>
                    <div className="data">{getDate(film.datauscita)} {film.durata} minutes</div>
                    <div className="genere">{film.genere}</div>
                    <br/><br/>
                    <div className="plot">
                        <b>Plot:</b> {film.trama}
                    </div>
                    <br /><br/>
                    {showDiscount()}
                    {checkLogin()}
                    
                </div>
            </div>
        </div>
    );
}