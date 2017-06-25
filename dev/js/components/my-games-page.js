/**
 * Created by William on 26/06/2017.
 */


import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import Card from "./mdl-card";
import Grid from "./mdl-grid";

require("../../css/style.css");

class MyGamesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "games": []
        };
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.fetchGames();
    }

    fetchGames() {
        fetch("http://elwinar.com:56789/joined", {
            method: "GET",
            headers: new Headers({token: this.props.token}),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({games: data});
        });
    }

    onClickJoinHandler() {
        fetch("http://elwinar.com:56789/game/" + arguments[0] + "/join", {
            method: "POST",
            headers: new Headers({token: this.props.token}),
            body: JSON.stringify({"name": arguments[1]}),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.player) {
                this.props.joinHandle(arguments[0], data.player, () => {
                    this.props.history.push("/play/" + arguments[0]);
                    console.log("game " + arguments[0] + " player " + data.player);
                });
            }
            if (data.error == "UNIQUE constraint failed: player.game_id, player.user_id") {
                this.props.history.push("/play/" + arguments[0]);
            };
        });
    }

    getGames() {
        return this.state.games ? this.state.games.map((game, index) => {
            return <Grid key={index}>
                <Cell sizeCol={8} classNames="gamesCard">
                    <Card
                        classNames="gameCard"
                        title={game.id + ". " + game.name + (game.finished_at != null ? " (finished)" : "")}
                        supportingText={(() => {
                            var text = "Game created at :" + (new Date(game.created_at)).toLocaleDateString() + " " + (new Date(game.created_at)).toLocaleTimeString();
                            text += game.started_at != null ?"<br /> Game started at :" + (new Date(game.started_at)).toLocaleDateString() + " " + (new Date(game.started_at)).toLocaleTimeString(): "";
                            text += game.finished_at != null ? "<br /> Game finished at :" + (new Date(game.started_at)).toLocaleDateString() + " " + (new Date(game.started_at)).toLocaleTimeString() : "";
                            return text;
                        })()}
                        buttonText={"Play this game"} handleClick={this.onClickJoinHandler.bind(this, game.id, this.props.username)}
                        unraisedButton={true}
                    />
                </Cell>
            </Grid>;
        }).reverse() : <Grid><h1>You haven't joined a game already</h1></Grid>;
    }

    render() {
        return <BasicPage>
            {this.getGames()}
        </BasicPage>;
    }
}

export default MyGamesPage;