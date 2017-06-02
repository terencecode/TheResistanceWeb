/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import Navigation from "./Navigation";

var linkNames = ["Connexion", "Inscription"];
var pageTitle = "The Resistance Game";

class App extends Component {
    render() {
        return (<Navigation navLinksNames={linkNames} title={pageTitle} />);
    }
}
export default App;