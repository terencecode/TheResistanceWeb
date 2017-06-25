/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import ConnexionPage from "./connexion-page";
import CreateGamePage from "./create-game-page";
import GamesPage from "./games-page";
import MyGamesPage from "./my-games-page";
import PlayPage from "./play-page";
import {Route, Redirect} from 'react-router-dom';
import PropTypes, {instanceOf} from 'prop-types';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';


class App extends Component {

    constructor(props) {
        super(props);
        const { cookies } = this.props;
        this.state = {
            "token": cookies.get("token") || "",
            "username": cookies.get("username") || "",
            "authenticated": false,
            "games": cookies.get("games") || {},
            "timer": null
        };
        this.setState = this.setState.bind(this);
    }

    authenticate() {
        if (this.state.token)
            fetch("http://elwinar.com:56789/authenticate", {
                method: "POST",
                headers: new Headers({token: this.state.token}),
                mode: "cors"
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.setState(data);
            });
    }

    onChangeTokenHandler(token, username) {
        const { cookies } = this.props;
        cookies.set("token", token, {
            path: "/",
            maxAge:300000
        });
        cookies.set("username", username, {path: "/"});
        this.setState({token: token, username: username}, () => {
            this.authenticate(token);
        });
    }

    onJoinHandler(gameId, playerId, callback, thisValue) {
        var joinedGame = {};
        joinedGame[gameId] = playerId;
        var userGames = {};
        userGames[this.state.username] = Object.assign({}, joinedGame, this.state.games[this.state.username]);
        const { cookies } = this.props;
        this.setState({games: userGames}, () => {
            cookies.set("games", this.state.games, {path: "/",});
        });
        callback.apply(this);
        console.log(JSON.stringify(cookies.get("games")));
    }

    startCountdown() {
        const { cookies } = this.props;
        this.state.timer = setInterval(() => {this.setState({token: cookies.get("token") || ""}, this.authenticate)}, 30000);
    }

    componentDidMount() {
        this.authenticate();
        this.startCountdown();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <CookiesProvider>
                <div>
                    <Route exact path="/"
                           render={(props) => this.state.authenticated == true ? <Redirect to="/games" /> : <Redirect to="/login" />} />
                    <Route path="/login"
                           render={(props) => this.state.authenticated == true ? <Redirect to="/"/> : <ConnexionPage {...props} onChangeToken={this.onChangeTokenHandler.bind(this)} />} />
                    <Route path="/create"
                           render={(props)  => this.state.authenticated == true ? <CreateGamePage {...props} token={this.state.token} joinHandle={this.onJoinHandler.bind(this)} username={this.state.username} /> : <Redirect to="/login" />} />
                    <Route path="/games"
                           render={(props)  => this.state.authenticated == true ? <GamesPage {...props} token={this.state.token} joinHandle={this.onJoinHandler.bind(this)} username={this.state.username}/> : <Redirect to="/login" />} />
                    <Route path="/my-games"
                           render={(props)  => this.state.authenticated == true ? <MyGamesPage {...props} token={this.state.token} joinHandle={this.onJoinHandler.bind(this)} username={this.state.username}/> : <Redirect to="/login" />} />
                    <Route path="/play/:gameId"
                           render={(props)  => this.state.authenticated == true ? <PlayPage {...props} token={this.state.token} /> : <Redirect to="/login" />} />
                </div>
            </CookiesProvider>
        );
    }
}

App.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired
}
export default withCookies(App);