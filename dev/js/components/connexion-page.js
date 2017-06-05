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
var $ = require("jquery");

class ConnexionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "password": "",
            "integrity": true,
            "token": ""
        };

        this.setState = this.setState.bind(this);
    }

    onChangeHandler(value) {
        this.setState({integrity: false}, () => {
            this.setState(value, () => {
                console.log("updated state " + JSON.stringify(this.state))
                this.setState({integrity: true});
            });
        });
    }

    loginRegister() {
        while(!this.state.integrity) {}
        var reqData = {};
        reqData.login = this.state.username;
        reqData.password = this.state.password;
        console.log(JSON.stringify(reqData));
        /*$.post("http://www.elwinar.com:56789/login", reqData, function(data, status){
                alert("Data: " + data + "\nStatus: " + status);
        });*/
        fetch("http://elwinar.com:56789/login", {
            method: "POST",
            body: JSON.stringify(reqData),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState(data, () => {
                console.log(JSON.stringify(this.state));
            });
            //TODO: go to play a game page
        });
    }

    render() {
        return (
            <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Cell sizeCol={6}>
                    <Cell sizeCol={12} ><TextField label={"username"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} /></Cell>
                    <Cell sizeCol={12} ><TextField type={"password"} label={"password"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} /></Cell>
                    <Cell sizeCol={12} ><Button type={"submit"} text={"Login/Register"} action={this.loginRegister.bind(this)}/></Cell>
                </Cell>
            </BasicPage>);
    }
}

export default ConnexionPage;