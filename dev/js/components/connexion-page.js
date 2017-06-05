/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";

var pageTitle = "The Resistance Game";
var navLinksNames = ["List the games", "Show a game", "Create a new game"];
require("../../css/style.css");

class ConnexionPage extends Component {
    render() {
        return (
            <BasicPage navLinksNames={navLinksNames} title={pageTitle}>
                <Cell sizeCol={4} offsetCell={true}></Cell>
                <Cell sizeCol={4} ><Button type={"submit"} text={"Login/Register"}/></Cell>
                <Cell sizeCol={4} offsetCell={true}></Cell>
            </BasicPage>);
    }
}

export default ConnexionPage;