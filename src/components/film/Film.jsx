import "./film.scss"
import { useState, useEffect, Component } from "react";
import axios from "axios";

export default class Film extends Component {
    constructor(props) {
        super(props);
        this.state = {film: null};
        console.log(props.match);
        /*
        axios.get("http://localhost:3001/film", {
            params: {
                id: props.match.params.id
            }
        }).then((response) => {
            console.log(response);
            this.state.film = response;
        });*/
      }

    render() {
        return (
            <div className="film">
                <div className="top">
                    <div className="left">
                        <img src={this.film.img} alt="" />
                    </div>
                    <div className="right">
                        <div className="title">{this.film.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}