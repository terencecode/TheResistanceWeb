
import React, {Component} from "react";
import ReactDOM from "react-dom";

class Button extends Component {
    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
        ReactDOM.findDOMNode(this).addEventListener("click", () => {
            this.props.action();
        });
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    getCssClassName() {
        var cName = "mdl-button mdl-js-button mdl-js-ripple-effect";
        cName += (this.props.accent ?" mdl-button--accent" : " mdl-button--colored");
        cName += (this.props.unraised ? "" : " mdl-button--raised");
        cName += (this.props.classNames ? " " + this.props.classNames : "");
        return cName;
    }

    render() {
        return (
            <button ref={component => this.component = component} type={this.props.type} value={this.props.value} name={this.props.name} form={this.props.form}
                    className={this.getCssClassName()} disabled={this.props.disabled ? this.props.disabled : false}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;