/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import ConnexionPage from "./connexion-page";
import CreateGamePage from "./create-game-page";
import {Route, browserHistory } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "token": "",
            "games": []
        };
        this.setState = this.setState.bind(this);
    }

    onChangeTokenHandler(token) {
        this.setState({token: token}, () => {
            console.log(this.state.token);
        });
    }

    render() {
        return (
            <div>
                <Route exact path="/" render={(props) => <ConnexionPage {...props} onChangeToken={this.onChangeTokenHandler.bind(this)} token={this.state.token} />} />
                <Route path="/create-a-game"  render={(props) => <CreateGamePage {...props} onChangeToken={this.onChangeTokenHandler.bind(this)} token={this.state.token} />} />
            </div>
        );
    }
}
export default App;