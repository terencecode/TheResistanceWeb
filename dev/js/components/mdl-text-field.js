/**
 * Created by William on 05/06/2017.
 */

import React, {Component} from "react";
const uuid = require("require('uuid/v4')");

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid()
        };
    }

    getCssClassName() {
        var cName = "mdl-textfield mdl-js-textfield";
        cName += (this.props.floating ? " mdl-textfield--floating-label" : "");
        return cName;
    }

    render() {
        return (
            <div class={this.getCssClassName()}>
                <input class="mdl-textfield__input" type={(this.props.type ? this.props.type : "text")} id={this.state.id}/>
                    <label class="mdl-textfield__label" for={this.state.id}>{this.props.label}</label>
            </div>
        );
    }
}