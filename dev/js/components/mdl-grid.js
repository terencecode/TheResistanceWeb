/**
 * Created by William on 04/06/2017.
 */

import React, {Component} from "react";

class Grid extends Component {
    render() {
        return (<div className="mdl-grid">{this.props.children}</div>);
    }
}

export default Grid;