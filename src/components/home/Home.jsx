import "./home.scss"
import { generes, specialsGenere } from "../navbar/genere";
import Films_bar from "../films_bar/Films_bar";

export default function Home() {

    return (
        <div className="home" id="home">
            <Films_bar show={specialsGenere[0].name}/>
            <Films_bar show={specialsGenere[1].name}/>
            <Films_bar show={generes[0].name}/>
            <Films_bar show={generes[1].name}/>
            <Films_bar show={generes[2].name}/>
            <Films_bar show={generes[3].name}/>
            <Films_bar show={generes[4].name}/>
            <Films_bar show={generes[5].name}/>
        </div>
        );
}