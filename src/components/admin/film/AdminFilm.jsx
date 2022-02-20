import "../../film/film.scss"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { typeOfManagement } from "../filmManagement";
import { discount } from "./discount";
import Loading from "../../loading/Loading";

export default function AdminFilm(){
    const navigate= useNavigate();
    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState([]);
    const [filmUpdateFist, setFilmUpdateFirst] = useState([]);
    const [numSales, setNumSales] = useState(0);
    const [earnings, setEarnings] = useState(0);
    // used to get the id passed from the url
    const { id } = useParams();

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

                setLoading(false);
            }
        });

        // get first update of this film
        axios.get("http://localhost:3001/update/" + id).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else{
                if(response.data.length > 0)
                    setFilmUpdateFirst(response.data[0]);
                else
                    console.log("No updated yet!");
            }
        });

        // get number of sales of this film
        axios.get("http://localhost:3001/sales/" + id).then((response) => {
            if(response.data === null)
                console.log("Error! Sales not found!");
            else{
                if(response.data.length > 0)
                    setNumSales(response.data[0].sales);
                else
                    console.log("No sales found!");
            }
        });

        // get earnings of this film
        axios.get("http://localhost:3001/earnings/" + id).then((response) => {
            if(response.data === null)
                console.log("Error! Earnings not found!");
            else{
                if(response.data.length > 0)
                    // approximation to two decimal places
                    setEarnings(Math.round(response.data[0].earn * 100) / 100);
                else
                    console.log("No earnings found!");
            }
        });
    }, []);

    // convert int date into readable string date
    function getDate(date){
        if(date == null)
            return "yyyy-mm-dd";

        return date.toString().substring(0, 4) + "-"
            + date.toString().substring(4, 6) + "-"
            + date.toString().substring(6, 8);
    }

    // delete film from database
    function deleteFilm(){
        axios.delete(`http://localhost:3001/film/delete/${id}`).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else
                // navigate to home page
                navigate('/admin/');
        });
    }

    // used to print update info or not
    function updateFirst(){
        if(filmUpdateFist.length == 0)
            return (<div className="none">This film hasn't been edited yet!</div>);
        else
            return(
            <div className="update-container">
                <div className="text"><b>Name:</b> {filmUpdateFist.nome}</div>
                <div className="text"><b>Genere:</b> {filmUpdateFist.genere}</div>
                <div className="text"><b>Plot:</b> {filmUpdateFist.trama}</div>
                <div className="text"><b>Date release:</b> {filmUpdateFist.datauscita}</div>
                <div className="text"><b>Duration:</b> {filmUpdateFist.durata}</div>
                <div className="text"><b>Price:</b> {filmUpdateFist.prezzo} €</div>
                <div className="text"><b>Url file:</b> {filmUpdateFist.file}</div>
                <div className="text"><b>Url image:</b> {filmUpdateFist.locandina}</div>
                <div className="text"><b>Admin id:</b> {filmUpdateFist.idAdmin}</div>
            </div>);
    }

    // used to show actual and possibile applicable discounts
    function showDiscount(value, key){
        if(value == film.sconto)
            return <button key={key} style={{color: "#ed3b3b", borderColor: "#ed3b3b"}}>{value}</button>
        else
            return <button key={key} onClick={() => updateDiscount(value)}>{value}</button>
    }


    // update discount in database
    function updateDiscount(value){
        // get first update of this film
        axios.post("http://localhost:3001/update/" + id + "/" + value).then((response) => {
            if(response.data === null)
                console.log("Error! Discount update rejected!");
            else
                // reload page in order to refresh discount
                window.location.reload();
        });
    }

    // used to show component or loading page
    function showComponent(){
        if(loading)
            return <Loading />
        else
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
                        <div className="admin_part">
                            <div className="discount_section">
                                <b>Discount%:</b>
                                {discount.map((d, key) => showDiscount(d.value, key))}
                            </div>
                            <b>Price:</b> {film.prezzo} €
                            <br/>
                            <b>Price with discount:</b> {Math.round(film.prezzo * (100 - film.sconto)) / 100} €
                            <br/>
                            Number of films sold: <b>{numSales}</b>
                            <br/>
                            Proceeds from sales: <b>{earnings != null ? earnings : 0} €</b>
                            <br />
                            Last update done by <b>{window.sessionStorage.getItem("email")}</b>
                            <div className="buttons_section">
                                <div className="edit">
                                    <button onClick={() => navigate("/admin/" + typeOfManagement[1].name + "/" + film.id)}>Edit</button>
                                </div>
                                <div className="delete">
                                    <button onClick={() => deleteFilm()}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="updateFirst">
                    <div className="title">
                        Update first
                    </div>
                    {updateFirst()}
                </div>
            </div>
        );
    }
 
    return (
        <div>{showComponent()}</div>
    );
}