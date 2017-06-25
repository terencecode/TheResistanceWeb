/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import TextField from "./mdl-text-field";
import Grid from "./mdl-grid";

require("../../css/style.css");

class CreateGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "Name of the game": "",
            "Number of players": "",
            "integrity": true
        };

        this.setState = this.setState.bind(this);
    }

    onChangeHandler(e, label) {
        var value = {};
        value[label + ""] = e.target.value;
        this.setState({integrity: false}, () => {
            this.setState(value, () => {
                this.setState({integrity: true});
            });
        });
    }

    play() {
        while(!this.state.integrity) {}
        var reqData = {};
        reqData["name"] = this.state["Name of the game"];
        reqData["players"] = parseInt(this.state["Number of players"]);
        console.log(JSON.stringify(reqData));
        fetch("http://elwinar.com:56789/game", {
            method: "POST",
            headers: new Headers({token: this.props.token}),
            body: JSON.stringify(reqData),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            fetch("http://elwinar.com:56789/game/" + data.game + "/join", {
                method: "POST",
                headers: new Headers({token: this.props.token}),
                body: JSON.stringify({"name": this.props.username}),
                mode: "cors"
            }).then((response) => {
                return response.json();
            }).then((data2) => {
                if (data2.player) {
                    this.props.joinHandle(data.game, data2.player, () => {
                        this.props.history.push("/play/" + data.game);
                        console.log("game " + data.game + " player " + data2.player);
                    });
                }
                if (data2.error == "UNIQUE constraint failed: player.game_id, player.user_id") {
                    this.props.history.push("/play/" + data.game);
                };
            });
        });
    }

    render() {
        return (
            <BasicPage>
                <Grid classNames="centeredPage">
                    <Cell sizeCol={4} classNames="formCreateAGame">
                        <form>
                            <Cell sizeCol={12} ><TextField label={"Name of the game"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} uid={"nameCreateAGamePage"}/></Cell>
                            <Cell sizeCol={12} ><TextField type={"number"} label={"Number of players"} floating={true} onChangeValue={this.onChangeHandler.bind(this)}  uid={"playersCreateAGamePage"}/></Cell>
                            <Cell sizeCol={12} ><Button type={"button"} text={"Create and play"} action={this.play.bind(this)}/></Cell>
                        </form>
                    </Cell>
                </Grid>
            </BasicPage>);
    }
}

export default CreateGamePage;