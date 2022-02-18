import "./filmManagement.scss";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { typeOfManagement } from "../filmManagement";

export default function FilmManagement() {
    const [name, setName] = useState("");
    const [genere, setGenere] = useState("");
    const [plot, setPlot] = useState("");
    const [date, setDate] = useState(""); // TODO: convert in int before insert into database
    const [price, setPrice] = useState(0.0);
    const [duration, setDuration] = useState(0);
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    // used to get the params passed from the url
    const { type } = useParams(); //edit or add
    const { idFilm } = useParams(); // in case of edit get film id

    // submit form after click
    function submit(e){
        e.preventDeafult();
        
        if(!checkFields())
            return;

        switch(type){
            case typeOfManagement[0].name:
                add();
                break;
            case typeOfManagement[1].name:
                edit();
                break; 
            default:
                console.log("Error! Type of film management not found!");
        }
    }

    // used to add new film inside database
    function add(){

    }

    // used to edit film inside database
    function edit(){

    }

    // used to check fields fillment
    function checkFields(){

    }

    // after the change of input text reload video
    function onVideoChange(file){
        setFile(file);

        // load video
        document.getElementById('video-upload').load();
    }

    return (
        <div className="filmManagement">
            <div className="title">Add film</div>

            <form onSubmit={(event) => submit(event)}>
                <div className="left">
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
                </div>
                <div className="right">
                    <div className="box-upload">
                        <div className="left">
                            <label>Film image:</label>
                            <input type="text" placeholder='Url film image' onChange={(event) => {setImage(event.target.value)}}/>
                        </div>
                        <div className="right">
                            <img src={image} alt="" id="image-upload"/>
                        </div>
                    </div>
                    <div className="box-upload">
                        <div className="left">
                            <label>Film file .mp4:</label>
                            <input type="text" placeholder='Url film video file' onChange={(event) => {onVideoChange(event.target.value)}}/>
                        </div>
                        <div className="right">
                            <video controls id="video-upload">
                                <source src={file} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    );
}