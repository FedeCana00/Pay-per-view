import "./disconnected.scss"
import { Link, Outlet } from "react-router-dom";

export default function Disconnected() {
    return (
        <div className="disconnected">
            <Link to="/access">
                <button> Login / Signup</button>
            </Link>
        </div>
    );
}