import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";
import Connected from "./connected/Connected";
import Disconnected from "./disconnected/Disconnected";

export default function Navbar() {

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
                        </ul>
                    </div>
                </div>
                <div className="right">
                    {window.sessionStorage.getItem('email') === null ? <Disconnected /> : <Connected />}
                </div>
            </div>

          <Outlet />
        </div>
    );
}