/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import Grid from "./mdl-grid";
require("../../../src/css/lib/material.min.css");
require("../../../src/js/lib/material.min.js");

class BasicPage extends Component {
    constructor(props) {
        super(props);
    }

    renderNavLinks() {
        return (this.props.navLinksNames.map((name, index) => {
            return (<a key={index} className="mdl-navigation__link" href="">{name}</a>);
        }));
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">{this.props.title}</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only">{this.renderNavLinks()}</nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">{this.props.title}</span>
                    <nav className="mdl-navigation">{this.renderNavLinks()}</nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <Grid>
                            {this.props.children}
                        </Grid>
                    </div>
                </main>
            </div>);
    }
}

export default BasicPage;