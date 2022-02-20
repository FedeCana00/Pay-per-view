import "./films_bar.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { generes, specialsGenere } from "../navbar/genere";
import axios from "axios";
import { type } from "../../constants/typeSearch";

export default function Films_bar({show}) {

    const [films, setFilms] = useState([]);
    // used to link to Film_Result
    const [typeSearch, setTypeSearch] = useState("");
    const [param, setParam] = useState("");

    // execute only one time
    useEffect(() => {
       switch(show){
           case generes[0].name:
                getGenere(generes[0].name);
                setTypeSearch(type[0].name);
                setParam(generes[0].name);
                break;
            case generes[1].name:
                getGenere(generes[1].name);
                setTypeSearch(type[0].name);
                setParam(generes[1].name);
                break;
            case generes[2].name:
                getGenere(generes[2].name);
                setTypeSearch(type[0].name);
                setParam(generes[2].name);
                break;
            case generes[3].name:
                getGenere(generes[3].name);
                setTypeSearch(type[0].name);
                setParam(generes[3].name);
                break;
            case generes[4].name:
                getGenere(generes[4].name);
                setTypeSearch(type[0].name);
                setParam(generes[4].name);
                break;
            case generes[5].name:
                getGenere(generes[5].name);
                setTypeSearch(type[0].name);
                setParam(generes[5].name);
                break;
           case specialsGenere[0].name:
               getNewReleases();
               setTypeSearch(type[3].name);
               setParam("New releases");
               break;
            case specialsGenere[1].name:
                getBestSellers();
                setTypeSearch(type[4].name);
                setParam("Best sellers");
       }
    }, []);

    // get new realeses
    function getNewReleases(){
        axios.get("http://localhost:3001/films/newReleases", {
            params: { }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                getResponseAndSetFilms(response);
        });
    }

    // get best sellers
    function getBestSellers(){
        axios.get("http://localhost:3001/films/bestsellers", {
            params: { }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                getResponseAndSetFilms(response);
        });
    }
    // get films by genere
    function getGenere(genere){
        axios.get("http://localhost:3001/films/genere", {
            params: { 
                genere: genere
            }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                getResponseAndSetFilms(response);
        });
    }

    // used to manage response and set films to view
    function getResponseAndSetFilms(response){
        if(response.data.length > 0){
            // get first 7 films not more
            var max = response.data.length > 7 ? 7 : response.data.length;
            var mFilms = [];
            // get item of response and put inside an array
            for(let i = 0; i < max; i++)
                mFilms.push(response.data[i]);
            setFilms(mFilms);
        } else 
            setFilms([]);
    }

    // used to show price with discount or full price
    function showPrice(d){
        if(d.sconto != 0)
            return (
                <div className="price">
                    <s>{d.prezzo} €</s> {Math.round(d.prezzo * (100 - d.sconto)) / 100} €
                </div>
            );
        else
            return (
                <div className="price">
                    {Math.round(d.prezzo * (100 - d.sconto)) / 100} €
                </div>
            );
    }

    return (
        <div className="films_bar" id={show}>
            <div className="title-container">
                <div className="title-name">{show}</div>
                <Link to={"/films/" + typeSearch + "/" + param}>
                    <button id="show more">Show more</button>
                </Link>
            </div>
            <div className="container">
                {films.map((d, key) => (
                    <Link to={"/film/" + d.id} key={key}>
                        <div className="card">
                            <img src={d.locandina} />
                            <div className="info">
                                <div className="name">{d.nome}</div>
                                <div className="genere">{d.genere}</div>
                                {showPrice(d)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        );
}