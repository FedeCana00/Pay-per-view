import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";
import Connected from "./connected/Connected";
import Disconnected from "./disconnected/Disconnected";
import { generes } from "./genere";
import { useState } from "react";

export default function Navbar() {
    const [showGeneres, setShowGeneres] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [textSearch, setTextSearch] = useState("");

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

    function textChanged(text){
        setTextSearch(text);

        // perform search if text is different from ""
        // else redirect to home
        
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <a href="" className="logo">
                        Pay per view
                    </a>
                    <img src="assets/icon.png" alt="icon" />
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
                    <Link to={"/films/" + d.name}>
                        {d.name}
                    </Link>
                ))}
            </div>

            {/* Box of search bar */}
            <div className={`box ${showSearchBar ? "active" : ""}`}>
                <input type="text" placeholder="Insert here the film name..." 
                    onChange={(event) => {textChanged(event.target.value)}}/>
                <img src="assets/search.png" alt="search" />
                <img src="assets/close.png" alt="clear"/>
            </div>

            <Outlet />
        </div>
    );
}