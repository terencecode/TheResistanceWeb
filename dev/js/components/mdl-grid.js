/**
 * Created by William on 04/06/2017.
 */

import React, {Component} from "react";

class Grid extends Component {

    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    render() {
        return (<div ref={component => this.component = component} className={"mdl-grid" +
        (this.props.classNames ? " " + this.props.classNames : "") +
        (this.props.noSpacing ? " mdl-grid--no-spacing" : "")}>{this.props.children}</div>);
    }
}

export default Grid;