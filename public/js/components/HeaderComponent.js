import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {getAllItems, getItemsByTerm} from '../actions/itemsAction';
import '../../ext/js/bootstrap';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.value = null;
    }

    render() {
        return (
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">
                            <strong className="blue-text">MDB</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link waves-effect" href="#">Home
                                        <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/" target="_blank">About
                                        MDB</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/docs/jquery/getting-started/download/"
                                       target="_blank">Free
                                        download</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link waves-effect" href="https://mdbootstrap.com/education/bootstrap/" target="_blank">Free
                                        tutorials</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect" target="_blank">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect" target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design" className="nav-link border border-light rounded waves-effect"
                                       target="_blank">
                                        <i className="fab fa-github mr-2"></i>MDB GitHub
                                    </a>
                                </li>
                            </ul>

                        </div>

                    </div>
                </nav>
            </header>);
    }

}




