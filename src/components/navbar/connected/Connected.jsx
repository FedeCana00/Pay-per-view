import "./connected.scss"

export default function Connected() {
    return (
        <div className="connected">
            <img src="assets/user.png" alt="user" />
            <div className="user">
                {window.sessionStorage.getItem('email')}
            </div>
        </div>
    );
}