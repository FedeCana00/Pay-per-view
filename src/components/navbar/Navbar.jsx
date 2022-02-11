import "./navbar.scss"
import { Link, Outlet } from "react-router-dom";

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
                            <li>
                                <Link to="/access">Access</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    {window.sessionStorage.getItem('email')}
                </div>
            </div>

          <Outlet />
        </div>
    );
}