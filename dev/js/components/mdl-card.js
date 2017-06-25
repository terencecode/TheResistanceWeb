/**
 * Created by William on 25/06/2017.
 */

import React, {Component} from "react";
import Button from "./mdl-button";

class Card extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.componentHandler.upgradeElements(this.component);
    }

    componentWillUnmount() {
        window.componentHandler.downgradeElements(this.component);
    }

    getCssClassName() {
        var cName = "mdl-card mdl-shadow--2dp";
        cName += (this.props.classNames ? " " + this.props.classNames : "");
        return cName;
    }

    render() {
        return <div className={this.getCssClassName()} ref={component => this.component = component}>
            <div className="mdl-card__title" >
                <h2 className="mdl-card__title-text" >{this.props.title}</h2>
            </div>
            <div className="mdl-card__supporting-text" >
                {this.props.supportingText}
            </div>
            <div className="mdl-card__actions mdl-card--border" >
                <Button type={"button"} text={this.props.buttonText}
                        action={this.props.handleClick} disabled={this.props.disabledButton} unraised={this.props.unraisedButton}/>
            </div>
        </div>;
    }
}

export default Card;