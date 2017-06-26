/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import TextField from "./mdl-text-field";
import Grid from "./mdl-grid";

var pageTitle = "The Resistance Game";
var navLinksNames = ["List the games", "Show a game", "Create a new game"];
require("../../css/style.css");

class PlayPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "token": "",
            "gameName": "",
            "playersJoinedNb": "",
            "playersNb": "",
            "gameStartDate": "",
            "gameCreationDate": "",
            "games": [],
            "players": []
        };

        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        fetch("http://elwinar.com:56789/joined", {
            method: "GET",
            headers: new Headers({token: this.props.token}),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({games: data});
        });

        fetch("http://elwinar.com:56789/game/" + this.props.match.params.gameId, {
            method: "GET",
            headers: new Headers({token: this.props.token}),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(JSON.stringify(data));
            this.setState({
                gameName: data.name,
                playersJoinedNb: data.joined,
                playersNb: data.players,
                gameStartDate: (new Date(data.started_at)).toLocaleDateString(),
                gameCreationDate: (new Date(data.created_at)).toLocaleDateString()}
            );
        });

        fetch("http://elwinar.com:56789/game/" + this.props.match.params.gameId + "/players", {
            method: "GET",
            headers: new Headers({token: this.props.token}),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({players: data}, () => {
                console.log(data);
                console.log(this.state);
            });
        });
    }

    getGames() {
        return this.state.games.map((game) => {
            <li className={"mdl-list__item" + (game.id == this.props.match.params.gameId ? " gameActivePlayPage" : "")}>
                <span className="mdl-list__item-primary-content">
                    {game.name}
                </span>
            </li>
        });
    }

    getPlayers() {
        return this.state.players.map((player, index) => {
            return <li key={index} className={"mdl-list__item" + (player.id == this.props.username ? " playerPlayPage" : "")}>
                <span className="mdl-list__item-primary-content">
                    {player.name}
                </span>
            </li>;
        });
    }

    render() {
        return (
            <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Grid classNames="playViewPlayPage" >
                    <Cell stretch={true} classNames="offsetCell" sizeCol={2} offset={true} />
                    <Cell stretch={true} sizeCol={3} >
                                <h3 className="nbOfPlayersPlayPage"> Players: {this.state.playersJoinedNb + "/" + this.state.playersNb}</h3>
                    </Cell>
                    <Cell stretch={true} sizeCol={5} >
                            <h3 className="gameNamePlayPage">{this.state.gameName}</h3>
                            <span className="gameDatePlayPage" >{this.state.gameCreationDate}</span>
                    </Cell>
                    <Cell stretch={true} classNames="offsetCell" sizeCol={2} offset={true} />
                    <Cell stretch={true} sizeCol={3} >
                            <ul className="player-list-item mdl-list">
                                {this.getPlayers()}
                            </ul>
                    </Cell>
                    <Cell stretch={true} sizeCol={5} >
                            <h1>Play Screen</h1>
                    </Cell>
                </Grid>
            </BasicPage>);
    }
}

export default PlayPage;