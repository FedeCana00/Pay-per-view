import { Link, Outlet } from "react-router-dom";
import Connected from "../../navbar/connected/Connected";
import { useState } from "react";
import { type } from "../../../constants/typeSearch";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [textSearch, setTextSearch] = useState("");
    // used to change programmatically page
    const navigate = useNavigate();

    // used to perform query of search by name
    function textChanged(text){
        setTextSearch(text);

        // perform search if text is different from ""
        // else redirect to home
        if(text.length > 0)
            navigate('/admin/films/' + type[1].name + '/' + text);
        else
            navigate('/admin/');
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="admin">Admin</div>
                    <a href="" className="logo">
                        Pay per view
                    </a>
                    <img src="/assets/icon.png" alt="icon" />
                </div>
                <div className="center">
                    <div className="text">
                        <ul>
                            <li>
                                <Link to="/admin/">Home</Link>
                            </li>
                            <li onClick={() => setShowSearchBar(!showSearchBar)}>
                                <a>Search</a>
                            </li>
                            <li>
                                <Link to="/admin/sales">Sales</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <Connected />
                </div>
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