import "./films_result.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { type } from "../../constants/typeSearch";
import Loading from "../loading/Loading";

export default function Films_Result() {
    const [loading, setLoading] = useState(true);
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
            case type[2].name:
                searchAll();
                break;
            case type[3].name:
                newRelease();
                break;
            case type[4].name:
                bestSeller();
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
            getResponseAndSetFilms(response);
        });
    }

    // search films by name (contains)
    function searchByName(){
        axios.get("http://localhost:3001/films/searchName", {
            params: {
                name: param
            }
        }).then((response) => {
            getResponseAndSetFilms(response);
        });
    }

    // search all films (admin)
    function searchAll(){
        axios.get("http://localhost:3001/films/searchAll", {}
        ).then((response) => {
            getResponseAndSetFilms(response);
        });
    }

    // search new release
    function newRelease(){
        axios.get("http://localhost:3001/films/newReleases", {
            params: { }
        }).then((response) => {
            getResponseAndSetFilms(response);
        });
    }

    // search all best seller
    function bestSeller(){
        axios.get("http://localhost:3001/films/bestsellers", {
            params: { }
        }).then((response) => {
            getResponseAndSetFilms(response);
        });
    }

     // used to manage response and set films to view
     function getResponseAndSetFilms(response){
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

        // interupt loading in each two case
        setLoading(false);
    }

    function goToFilmPage(id){
        if(!window.sessionStorage.getItem('isAdmin') || window.sessionStorage.getItem('isAdmin') == null)
            return "/film/" + id;
        
        return "/admin/film/" + id;
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

    // used to show component or loading page
    function showComponent(){
        if(loading)
            return <Loading />
        else
            return (
                <div className="films_result" id="films_result">
                    <div className="title-container">
                        <div className="title-name">{param}</div>
                    </div>
                    <div className="container">
                        {films.map((d, key) => (
                            <Link to={goToFilmPage(d.id)} key={key}>
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
                    <div className={"notFound " + (notFound && "active")}>
                        <h1>Not found!</h1>
                        <h3>Please retry...</h3>
                    </div>
                </div>
                );
    }

    return (
        <div>{showComponent()}</div>
        );
}