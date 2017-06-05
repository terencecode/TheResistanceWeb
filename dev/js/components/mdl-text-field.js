/**
 * Created by William on 05/06/2017.
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
const uuid = require("uuid/v4");

class TextField extends Component {
    constructor(props) {
        super(props);
        var uid = uuid();
        this.state = {
            id: uid
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //this.setState({value: e.target.value});
        var value = {};
        value[this.props.label + ""] = e.target.value;
        this.props.onChangeValue(value);
    }

    getCssClassName() {
        var cName = "mdl-textfield mdl-js-textfield";
        cName += (this.props.floating ? " mdl-textfield--floating-label" : "");
        return cName;
    }

    render() {
        return (
            <div className={this.getCssClassName()}>
                <input className="mdl-textfield__input" type={(this.props.type ? this.props.type : "text")} id={this.state.id}
                    onChange={this.handleChange}/>
                    <label className="mdl-textfield__label" htmlFor={this.state.id}>{this.props.label}</label>
            </div>
        );
    }
}

export default TextField;