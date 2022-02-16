import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";
import Connected from "./connected/Connected";
import Disconnected from "./disconnected/Disconnected";
import { generes } from "./genere";
import { useState } from "react";
import { type } from "../../constants/typeSearch";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [showGeneres, setShowGeneres] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    // used to change programmatically page
    const navigate = useNavigate();

    // used to switch bar ON or OFF
    function show(isGeneres){
        if(isGeneres){
            setShowGeneres(!showGeneres);
            if(showSearchBar)
                setShowSearchBar(false);
        } else {
            setShowSearchBar(!showSearchBar);
            if(showGeneres)
                setShowGeneres(false);
        }
    }

    // used to perform query of search by name
    function textChanged(text){
        setTextSearch(text);

        // perform search if text is different from ""
        // else redirect to home
        if(text.length > 0)
            navigate('/films/' + type[1].name + '/' + text);
        else
            navigate('/');
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <a href="" className="logo">
                        Pay per view
                    </a>
                    <img src="/assets/icon.png" alt="icon" />
                </div>
                <div className="center">
                    <div className="text">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={() => show(true)}>
                                <a>Generes</a>
                            </li>
                            <li onClick={() => show(false)}>
                                <a>Search</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    {window.sessionStorage.getItem('email') === null ? <Disconnected /> : <Connected />}
                </div>
            </div>

            {/* Box of genere */}
            <div className={`box ${showGeneres ? "active" : ""}`}>
                {generes.map((d) => (
                    <Link to={"/films/" + type[0].name + "/" + d.name}>
                        {d.name}
                    </Link>
                ))}
            </div>

            {/* Box of search bar */}
            <div className={`box ${showSearchBar ? "active" : ""}`}>
                <input type="text" placeholder="Insert here the film name..." 
                    onChange={(event) => {textChanged(event.target.value)}}
                    value={textSearch}/>
                <img src="/assets/search.png" alt="search" />
                <img src="/assets/close.png" alt="clear" onClick={() => {textChanged("")}}/>
            </div>

            <Outlet />
        </div>
    );
}