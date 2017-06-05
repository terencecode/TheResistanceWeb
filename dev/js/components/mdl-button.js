/**
 * Created by William on 04/06/2017.
 */

import React, {Component} from "react";

class Button extends Component {
    getCssClassName() {
        var cName = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect";
        cName += (this.props.accent ?" mdl-button--accent" : " mdl-button--colored");
        return cName;
    }


    render() {
        return (
            <button type={this.props.type} value={this.props.value} name={this.props.name} form={this.props.form} className={this.getCssClassName()} disabled={this.props.disabled ? this.props.disabled : false}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;