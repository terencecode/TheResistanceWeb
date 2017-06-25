/**
 * Created by William on 04/06/2017.
 */

import React, {Component} from "react";

class Cell extends Component {
    getCssClassName() {
        return "mdl-cell mdl-cell--" + this.props.sizeCol + "-col" + (this.props.offsetCell ? "-offset" : "") + "-desktop"
             + (this.props.center ? " mdl-cell--middle" : "") + (this.props.stretch ? " mdl-cell--stretch" : "") +
            (this.props.classNames ? " " + this.props.classNames: "");
    }

    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    render() {
        return (<div ref={component => this.component = component} className={this.getCssClassName()}>{this.props.children}</div>);
    }
}

export default Cell;