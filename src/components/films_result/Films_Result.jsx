import "./films_result.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Films_Result() {

    const [films, setFilms] = useState([]);
    // used to get the id passed from the url
    const { genere } = useParams()

    // execute only one time
    useEffect(() => {
        
        axios.get("http://localhost:3001/films/genere", {
            params: {
                genere: genere
            }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                setFilms(response.data);
        });
    }, []);

    return (
        <div className="films_result" id="films_result">
            <div className="title-container">
                <div className="title-name">{genere}</div>
            </div>
            <div className="container">
                {films.map((d) => (
                    <Link to={"/film/" + d.id}>
                        <div className="card">
                            <img src={d.locandina} />
                            <div className="info">
                                <div className="name">{d.nome}</div>
                                <div className="genere">{d.genere}</div>
                                <div className="price">{d.prezzo} €</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        );
}