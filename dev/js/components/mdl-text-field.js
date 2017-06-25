/**
 * Created by William on 05/06/2017.
 */

import React, {Component} from "react";
const uuid = require("uuid/v4");

class TextField extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChangeValue(e, this.props.label);
    }

    getCssClassName() {
        var cName = "mdl-textfield mdl-js-textfield";
        cName += (this.props.floating ? " mdl-textfield--floating-label" : "");
        return cName;
    }

    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    render() {
        return (
            <div className={this.getCssClassName()} ref={component => this.component = component}>
                <input className="mdl-textfield__input" type={(this.props.type ? this.props.type : "text")} id={this.props.uid}
                       onChange={this.handleChange}/>
                    <label className="mdl-textfield__label" htmlFor={this.props.uid}>{this.props.label}</label>
            </div>
        );
    }
}

export default TextField;