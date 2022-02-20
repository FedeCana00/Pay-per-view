import "./filmManagement.scss";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { typeOfManagement } from "../filmManagement";
import { generes } from "../../navbar/genere";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function FilmManagement() {
    // used to change programmatically page
    const navigate = useNavigate();
    // variables
    const [name, setName] = useState("");
    const [genere, setGenere] = useState("");
    const [plot, setPlot] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(0.0);
    const [duration, setDuration] = useState(0);
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    // used to pass value of old film and add update
    const [oldFilm, setOldFilm] = useState([]);
    // used to show error message
    const [errorMsg, setErrorMsg] = useState("");
    // used to show success message
    const [successMsg, setSuccessMsg] = useState("");
    // used to get the params passed from the url
    const { type } = useParams(); //edit or add
    const { idFilm } = useParams(); // in case of edit get film id

    // execute only one time
    useEffect(()=>{
        if(idFilm == null)
            return;
        
        // set up input field with information about film to edit
        axios.get("http://localhost:3001/film", {
            params: {
                id: idFilm
            }
        }).then((response) => {
            if(response.data === null)
                console.log("Error! Film not found!");
            else{
                if(response.data.length > 0){
                    setOldFilm(response.data[0]);
                    setName(response.data[0].nome);
                    setGenere(response.data[0].genere);
                    setPlot(response.data[0].trama);
                    setDate(getDate(response.data[0].datauscita));
                    setPrice(response.data[0].prezzo);
                    setDuration(response.data[0].durata);
                    setImage(response.data[0].locandina);
                    setFile(response.data[0].file);
                } else
                    console.log("Error! Film not found!");
            }
        });
    },[]);

    // submit form after click
    function submit(e){
        e.preventDefault();
        
        // check the fillment of the fields
        if(!checkFields())
            return;

        // check if anything has been changed
        if(!checkEdit())
            return;

        // in order of type of operation choose action
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
        // post request
        axios.post("http://localhost:3001/film/add", {
            name: name,
            genere: genere,
            plot: plot,
            date: convertDateIntoInt(date),
            price: price,
            duration: duration,
            image: image,
            file: file,
            idAdmin: window.sessionStorage.getItem('id')
        }).then(() => {
            console.log("Film added successfully!");
        });

        setSuccessMsg("Film added successfully!");

        // reset success message after 5 seconds
        setTimeout(() => setSuccessMsg(""), 5000);
        // go to admin home page
        navigate('/admin/');
    }

    // used to edit film inside database
    function edit(){
        // post request
        axios.post("http://localhost:3001/film/edit", {
            oldFilm: oldFilm,
            id: idFilm,
            name: name,
            genere: genere,
            plot: plot,
            date: convertDateIntoInt(date),
            price: price,
            duration: duration,
            image: image,
            file: file,
            idAdmin: window.sessionStorage.getItem('id')
        }).then(() => {
            console.log("Film edited successfully!");
        });

        setSuccessMsg("Film edited successfully!");

        // reset success message after 5 seconds
        setTimeout(() => setSuccessMsg(""), 5000);
        // go to admin home page
        navigate('/admin/');
    }

    // used to check fields fillment
    function checkFields(){
        setErrorMsg("");
        let msg = "";
        
        if(name.length <= 0)
            msg += "Name is empty! \n";
        if(plot.length <= 0)
            msg += "Plot is empty!\n";
        if(isNaN(Date.parse(date)))
            msg += "Date is wrong!\n";
        if(price <= 0)
            msg += "Price is wrong!\n";
        if(duration <= 0)
            msg += "Duration is wrong!\n";
        if(file.length <= 0)
            msg += "File url is wrong!\n";
        if(image.length <= 0)
            msg += "Image url is wrong!\n";

        setErrorMsg(msg);

        // reset error message after 5 seconds
        setTimeout(() => setErrorMsg(""), 5000);

        return msg.length == 0;
    }

    // check if anything has been changed
    function checkEdit(){
        setErrorMsg("");
        let msg = "";
        let text = "Nothing has been changed since before!";

        if(name == oldFilm.nome && genere == oldFilm.genere
            && plot == oldFilm.trama && convertDateIntoInt(date) == oldFilm.datauscita
            && price == oldFilm.prezzo && duration == oldFilm.durata
            && image == oldFilm.locandina && file == oldFilm.file)
            msg = text;

        setErrorMsg(msg);

        // reset error message after 5 seconds
        setTimeout(() => setErrorMsg(""), 5000);

        return msg.length == 0;
    }

    // remove "-" and convert to integer
    function convertDateIntoInt(date){
        return parseInt(date.replaceAll("-", ""));
    }

    // after the change of input text reload video
    function onVideoChange(file){
        setFile(file);

        // load video
        document.getElementById('video-upload').load();
    }

    // convert int date into date format input field
    function getDate(date){
        return date.toString().substring(0, 4) + "-"
            + date.toString().substring(4, 6) + "-"
            + date.toString().substring(6, 8);
    }

    return (
        <div className="filmManagement">
            <div className="title">Add film</div>

            <form onSubmit={(event) => submit(event)}>
                <div className="left">
                    <label>Film name</label>
                    <input type="text" placeholder="Film name" value={name} onChange={(event) => {setName(event.target.value)}}/>
                    <label>Genere:</label>
                    <select id="cars" name="Genere" value={genere} onChange={(event) => {setGenere(event.target.value)}}>
                        {generes.map((d, key) => (<option value={d.name} key={key}>{d.name}</option>))}
                    </select>
                    <label>Plot:</label>
                    <textarea placeholder='Plot' value={plot} onChange={(event) => {setPlot(event.target.value)}}/>
                    <label>Release date:</label>
                    <input type="date" value={date} onChange={(event) => {setDate(event.target.value)}}/>
                    <label>Duration:</label>
                    <input type="number" min="0" step="1" placeholder='Duration' value={duration} onChange={(event) => {setDuration(event.target.value)}}/>
                    <label>Price:</label>
                    <input type="number" min="0.1" step="0.01" placeholder='Price in eur' value={price} onChange={(event) => {setPrice(event.target.value)}}/>
                </div>
                <div className="right">
                    <div className="box-upload">
                        <div className="left">
                            <label>Film image:</label>
                            <input type="text" placeholder='Url film image' value={image} onChange={(event) => {setImage(event.target.value)}}/>
                        </div>
                        <div className="right">
                            <img src={image} alt="" id="image-upload"/>
                        </div>
                    </div>
                    <div className="box-upload">
                        <div className="left">
                            <label>Film file .mp4:</label>
                            <input type="text" placeholder='Url film video file' value={file} onChange={(event) => {onVideoChange(event.target.value)}}/>
                        </div>
                        <div className="right">
                            <video controls id="video-upload">
                                <source src={'http://localhost:3001/'+file.replace(/^.*[\\\/]/, '')} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <button type='submit'>{idFilm == "film" ? "Add" : "Edit"}</button>
                </div>
            </form>

             {/* Used to show error message */}
             <Snackbar open={errorMsg.length > 0} autoHideDuration={0} anchorOrigin={{vertical: 'bottom', horizontal:'center'}}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>

            {/* Used to show success message */}
            <Snackbar open={successMsg.length > 0} autoHideDuration={0} anchorOrigin={{vertical: 'bottom', horizontal:'center'}}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    {successMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}