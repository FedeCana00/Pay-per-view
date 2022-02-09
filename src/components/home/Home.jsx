import "./home.scss"

export default function Home() {

    const films = [
        {
            id: 1,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 2,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 3,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 4,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 5,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 6,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
        {
            id: 7,
            name: "film1",
            genere: "horror",
            price: 12.20
        },
    ];

    return (
        <div className="home" id="home">
            <div className="title-container">
                <div className="title-name">Best seller</div>
                <button id="show more">Show more</button>
            </div>
            <div className="container">
                {films.map((d) => (
                    <div className="card">
                        <img src="assets/film.jpg" />
                        <div className="info">
                            <div className="name">{d.name}</div>
                            <div className="genere">{d.genere}</div>
                            <div className="price">{d.price} €</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        );
}