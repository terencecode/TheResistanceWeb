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

class ConnexionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "token": "",
            "Name of the game": "",
            "Number of players": "",
            "integrity": true
        };

        this.setState = this.setState.bind(this);
    }

    render() {
        return (
            <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Cell sizeCol={3} classNames="headerRow">
                    <h1>Welcome {this.props.username}</h1>
                </Cell>
            </BasicPage>);
    }
}

export default ConnexionPage;/**
 * Created by William on 22/06/2017.
 */
