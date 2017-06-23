/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import TextField from "./mdl-text-field";

var pageTitle = "The Resistance Game";
var navLinksNames = ["List the games", "Show a game", "Create a new game"];
require("../../css/style.css");

require("../../../src/css/lib/material.min.css");
require("../../../src/js/lib/material.min.js");

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
                //console.log("updated state " + JSON.stringify(this.state));
                this.setState({integrity: true});
            });
        });
    }

    play() {
        while(!this.state.integrity) {}
        var reqData = {};
        reqData["name"] = this.state["Name of the game"];
        reqData["players"] = parseInt(this.state["Number of players"]);
        //reqData.token = this.props.token;
        console.log(JSON.stringify(reqData));
        console.log(this.props.token);
        fetch("http://elwinar.com:56789/game", {
            method: "POST",
            headers: new Headers({token: this.props.token}),
            body: JSON.stringify(reqData),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.props.history.push("/play");
        });
    }

    render() {
        return (
            <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Cell sizeCol={4} classNames="formCreateAGame">
                    <form>
                        <Cell sizeCol={12} ><TextField label={"Name of the game"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} uid={"nameCreateAGamePage"}/></Cell>
                        <Cell sizeCol={12} ><TextField type={"number"} label={"Number of players"} floating={true} onChangeValue={this.onChangeHandler.bind(this)}  uid={"playersCreateAGamePage"}/></Cell>
                        <Cell sizeCol={12} ><Button type={"button"} text={"Play"} action={this.play.bind(this)}/></Cell>
                    </form>
                </Cell>
            </BasicPage>);
    }
}

export default CreateGamePage;