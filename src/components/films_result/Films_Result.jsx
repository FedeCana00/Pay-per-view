import "./films_result.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { type } from "../../constants/typeSearch";

export default function Films_Result() {

    const [films, setFilms] = useState([]);
    const [notFound, setNotFound] = useState(false);
    // used to get the params passed from the url
    const { param } = useParams();
    const { t } = useParams();

    // execute each time that param change
    useEffect(() => {
        
        switch(t){
            case type[0].name:
                searchByGenere();
                break;
            case type[1].name:
                searchByName();
                break;
        }
    }, [param]);

    // search films by genere
    function searchByGenere(){
        axios.get("http://localhost:3001/films/genere", {
            params: {
                genere: param
            }
        }).then((response) => {
            if(response.data === null){
                console.log("Error! Film not found!");
                setNotFound(true);
            } else{
                if(response.data.length > 0){
                    setFilms(response.data);
                    setNotFound(false);
                } else {
                    setFilms([]);
                    setNotFound(true);
                }
            }
        });
    }

    // search films by name (contains)
    function searchByName(){
        axios.get("http://localhost:3001/films/searchName", {
            params: {
                name: param
            }
        }).then((response) => {
            if(response.data === null){
                setNotFound(true);
                console.log("Error! Film not found!"); 
            } else{
                if(response.data.length > 0){
                    setFilms(response.data);
                    setNotFound(false);
                } else {
                    setFilms([]);
                    setNotFound(true);
                }
            }
        });
    }

    return (
        <div className="films_result" id="films_result">
            <div className="title-container">
                <div className="title-name">{param}</div>
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
            <div className={"notFound " + (notFound && "active")}>
                <h1>Not found!</h1>
                <h3>Please retry...</h3>
            </div>
        </div>
        );
}