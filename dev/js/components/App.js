/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import ConnexionPage from "./connexion-page";
import {Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" component={ConnexionPage} />
            </Switch>
        );
    }
}
export default App;