import "./filmManagement.scss";
import { useState } from "react";
import { useParams } from 'react-router-dom';

export default function FilmManagement() {
    const [name, setName] = useState("");
    const [genere, setGenere] = useState("");
    const [plot, setPlot] = useState("");
    const [date, setDate] = useState(""); // TODO: convert in int before insert into database
    const [price, setPrice] = useState(0.0);
    const [duration, setDuration] = useState(0);
    // used to get the params passed from the url
    const { type } = useParams(); //edit or add
    const { idFilm } = useParams(); // in case of edit get film id

    function submit(e){
        e.preventDeafult();


    }

    return (
        <div className="filmManagement">
            <div className="title">Add film</div>

            <form onSubmit={(event) => submit(event)}>
                <label>Film name</label>
                <input type="text" placeholder="Film name" onChange={(event) => {setName(event.target.value)}}/>
                <label>Genere:</label>
                <input type="text" placeholder='Genere' onChange={(event) => {setGenere(event.target.value)}}/>
                <label>Plot:</label>
                <input type="textarea" placeholder='Plot' onChange={(event) => {setPlot(event.target.value)}}/>
                <label>Release date:</label>
                <input type="date" onChange={(event) => {setDate(event.target.value)}}/>
                <label>Duration:</label>
                <input type="number" min="0" step="1" placeholder='Duration' onChange={(event) => {setDuration(event.target.value)}}/>
                <label>Price:</label>
                <input type="number" min="0.1" step="0.1" placeholder='Price in eur' onChange={(event) => {setPrice(event.target.value)}}/>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
}