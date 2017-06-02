/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import Navlink from "./nav-link";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    renderNavLinks() {
        return (this.props.navLinksNames.map((name) => {
            return (<Navlink linkName={name} />);
        }));
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout">
                <header className="mdl-layout__header mdl-layout__header--scroll">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">{this.props.title}</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation">{() => this.renderNavLinks()}</nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <nav className="mdl-navigation">{() => this.renderNavLinks()}</nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                    </div>
                </main>
            </div>);
    }
}

export default Navigation;