import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";
import Connected from "./connected/Connected";
import Disconnected from "./disconnected/Disconnected";
import { generes } from "./genere";
import { useState } from "react";

export default function Navbar() {
    const [showGeneres, setShowGeneres] = useState(false);

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
                            <li onClick={() => setShowGeneres(!showGeneres)}>
                                <a>Generes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    {window.sessionStorage.getItem('email') === null ? <Disconnected /> : <Connected />}
                </div>
            </div>
            <div className={`generes ${showGeneres ? "active" : ""}`}>
                {generes.map((d) => (
                    <Link to={"/films/" + d.name}>
                        {d.name}
                    </Link>
                ))}
            </div>

            <Outlet />
        </div>
    );
}