
import React, {Component} from "react";
import BasicPage from "./basic-page";
import Cell from "./mdl-cell";
import Button from "./mdl-button";
import TextField from "./mdl-text-field";

import Grid from "./mdl-grid";

require("../../css/style.css");

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
                this.setState({integrity: true});
            });
        });
    }

    loginRegister() {
        while(!this.state.integrity) {}
        var reqData = {};
        reqData.login = this.state.username;
        reqData.password = this.state.password;
        fetch("http://elwinar.com:56789/login", {
            method: "POST",
            body: JSON.stringify(reqData),
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.props.onChangeToken(data.token, this.state.username);
        });
    }

    render() {
        return <BasicPage>
            <Grid classNames="centeredPage">
                <Cell sizeCol={4} classNames="formLogin">
                    <form>
                        <TextField label={"username"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} uid={"usernameConnexionPage"}/>
                        <br />
                        <TextField type={"password"} label={"password"} floating={true} onChangeValue={this.onChangeHandler.bind(this)} uid={"passwordConnexionPage"}/>
                        <br />
                        <Button type={"button"} text={"Login/Register"} action={this.loginRegister.bind(this)} />
                    </form>
                </Cell>
            </Grid>
            </BasicPage>;
    }
}

export default ConnexionPage;