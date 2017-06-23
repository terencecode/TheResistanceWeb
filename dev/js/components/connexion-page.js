/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import TextField from "./mdl-text-field";
import { Route, Redirect } from "react-router-dom";

var pageTitle = "The Resistance Game";
var navLinksNames = ["List the games", "Show a game", "Create a new game"];
require("../../css/style.css");

require("../../../src/css/lib/material.min.css");
require("../../../src/js/lib/material.min.js");

class ConnexionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "password": "",
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

    loginRegister() {
        while(!this.state.integrity) {}
        var reqData = {};
        reqData.login = this.state.username;
        reqData.password = this.state.password;
        //console.log(JSON.stringify(reqData));
        fetch("http://elwinar.com:56789/login", {
            method: "POST",
            body: JSON.stringify(reqData),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.props.onChangeToken(data.token);
            fetch("http://elwinar.com:56789/authenticate", {
                method: "POST",
                headers: new Headers({token: this.props.token}),
                mode: "cors"
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(JSON.stringify(data));
                if (data.authenticated === true) {
                    this.props.history.push("create-a-game");
                }
            });
        });
    }

    render() {
        return <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Cell sizeCol={4} classNames="formLogin">
                    <form>
                        <Cell sizeCol={12}><TextField label={"username"} floating={true}
                                                      onChangeValue={this.onChangeHandler.bind(this)}
                                                      uid={"usernameConnexionPage"}/></Cell>
                        <Cell sizeCol={12}><TextField type={"password"} label={"password"} floating={true}
                                                      onChangeValue={this.onChangeHandler.bind(this)}
                                                      uid={"passwordConnexionPage"}/></Cell>
                        <Cell sizeCol={12}><Button type={"button"} text={"Login/Register"}
                                                   action={this.loginRegister.bind(this)}/></Cell>
                    </form>
                </Cell>
            </BasicPage>;
    }
}

export default ConnexionPage;