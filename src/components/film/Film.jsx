import "./film.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Film(){
    const [film, setFilm] = useState({});
    // used to get the id passed from the url
    const { id } = useParams()

    // execute only one time
    useEffect(() => {
        
        axios.get("http://localhost:3001/film", {
            params: {
                id: id
            }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                setFilm(response.data[0]);
        });
    }, []);

    return (
        <div className="film">
            <div className="top">
                <div className="left">
                    <img src={film.locandina} alt="" />
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
                    <button>Buy in 4k {film.prezzo} €</button>
                </div>
            </div>
        </div>
    );
}