/**
 * Created by William on 04/06/2017.
 */

import React, {Component} from "react";

class Cell extends Component {
    getCssClassName() {
        return "mdl-cell mdl-cell--" + this.props.sizeCol + "-col" + (this.props.offsetCell ? "-offset" : "") + "-desktop";
    }

    render() {
        return (<div className={this.getCssClassName()}>{this.props.children}</div>);
    }
}

export default Cell;