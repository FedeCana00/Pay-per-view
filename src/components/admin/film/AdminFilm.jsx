import "../../film/film.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AdminFilm(){
    const navigate= useNavigate()
    const [film, setFilm] = useState([]);
    // used to get the id passed from the url
    const { id } = useParams()

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
    }, []);
 
    return (
        <div className="film">
            <div className="top">
                <div className="left">
                    <img src={film.locandina} alt=""/>
                </div>
                <div className="right">
                    <div className="title">{film.nome}</div>
                    <div className="data">{film.datauscita} {film.durata} minutes</div>
                    <div className="genere">{film.genere}</div>
                    <br/><br/>
                    <div className="plot">
                        <b>Plot:</b> {film.trama}
                    </div>
                    <br /><br/>
                    <div className="admin_part">
                        Last update done by {window.sessionStorage.getItem("email")}

                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}