/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";

class NavLink extends Component {
    render() {
        return (
        <a className="mdl-navigation__link" href="">{this.props.linkName}</a>
        );
    }
}

export default NavLink;