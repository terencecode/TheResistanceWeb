/**
 * Created by William on 02/06/2017.
 */

import React, {Component} from "react";
import { Link } from 'react-router-dom';

const pageTitle = "The Resistance Game";
const navLinksNames = ["Create a new game", "All the games", "My games" ];
const paths = ["/create", "/games", "/my-games"];

class BasicPage extends Component {
    constructor(props) {
        super(props);
    }

    renderNavLinks() {
        return (navLinksNames.map((name, index) => {
            return (<Link key={index} className="mdl-navigation__link" to={paths[index]} >{name}</Link>);
        }));
    }

    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    render() {
        return (
            <div ref={component => this.component = component} className="mdl-layout mdl-js-layout">
                <header className="mdl-layout__header mdl-layout__header--scroll">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">{pageTitle}</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only">{this.renderNavLinks()}</nav>
                    </div>
                </header>
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">{pageTitle}</span>
                    <nav className="mdl-navigation">{this.renderNavLinks()}</nav>
                </div>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        {this.props.children}
                    </div>
                </main>
            </div>);
    }
}

export default BasicPage;