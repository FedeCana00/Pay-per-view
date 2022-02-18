import "./sales.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Sales() {
    const [sales, setSales] = useState([]);

    // execute only one time
    useEffect(() => {
        getSales();
    }, []);

    // get all sales from database
    function getSales(){
        axios.get("http://localhost:3001/sales", {}
        ).then((response) => {
            if(response.data === null)
                console.log("Error! Sales not found!"); 
            else{
                console.log(response.data);
                if(response.data.length > 0)
                    setSales(response.data);
                else 
                    setSales([]);
            }
        });
    }

    // used to convert date in a readable format
    function getDate(date){
        return date.substring(0, 10) + " " + date.substring(11, 16);
    }

    return(
        <div className="sales">
            <div className="title">Sales</div>

            {sales.map((d, key) => (
                <div className="box_sale" key={key}>
                    <img src={d.locandina} alt="" />
                    <div className="sale_info">{d.nome}</div>
                    <div className="sale_info">{d.email}</div>
                    <div className="sale_info">{getDate(d.data)}</div>
                    <div className="sale_price">{d.prezzo} €</div>
                </div>
            ))}
        </div>
    );

}