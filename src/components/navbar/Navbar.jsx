import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";
import Connected from "./connected/Connected";
import Disconnected from "./disconnected/Disconnected";
import { generes } from "./genere";
import { useState } from "react";

export default function Navbar() {
    const [showGeneres, setShowGeneres] = useState(false);

    const showHide = () => {
        console.log(showGeneres);
        setShowGeneres(!showGeneres);
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
                            <li onClick={showHide}>
                                <a>Generes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    {window.sessionStorage.getItem('email') === null ? <Disconnected /> : <Connected />}
                </div>
            </div>
            <div className={showGeneres ? "generes active" : "generes"}>
                {generes.map((d) => (
                    <div className="genere">
                        <img src={d.img} />
                        <div className="info">
                            {d.name}
                        </div>
                    </div>
                ))}
            </div>

            <Outlet />
        </div>
    );
}