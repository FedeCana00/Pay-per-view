import "./loading.scss";

export default function Loading() {

    return (
        <div className="loading" id="loading">
            <div className="blue ball">
                <img src="assets/icon.png" alt=""/>
            </div>
            <div className="red ball">
                <img src="assets/icon.png" alt=""/>
            </div> 
            <div className="yellow ball">
                <img src="assets/icon.png" alt=""/>
            </div>
            <div className="green ball">
                <img src="assets/icon.png" alt=""/>
            </div>
        </div>
    );
}