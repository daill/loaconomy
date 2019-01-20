
import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

export default class AutoSuggestItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {classes: this.props.className};
    }


    setActive() {
        this.setState({classes: this.state.classes + " " + this.props.activeClass})
    }

    setNotActive() {
        this.setState({classes: this.props.className})
    }


    render() {
        return (
            <li onMouseEnter={(e) => this.setActive(e)} onMouseLeave={(e) => this.setNotActive(e)} onClick={() => {this.props.onSelectItem(this.props.itemName)}} className={this.state.classes}>
                {this.props.itemName}
            </li>);
    }
}










