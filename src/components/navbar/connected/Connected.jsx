import "./connected.scss"
import { useNavigate } from 'react-router-dom';

export default function Connected() {
    // used to change programmatically page
    const navigate = useNavigate();

    // logout from session
    const logout = () => {
        window.sessionStorage.clear();

        // go to home page
        navigate('/');
        // refresh page in order reload navabar component 
        // else not change element on the right
        window.location.reload();
    };

    return (
        <div className="connected">
            <img src="assets/user.png" alt="user" />
            <div className="user">
                {window.sessionStorage.getItem('email')}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}