import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let headerLink = (
            <li className="nav-item active">
                <Link className="nav-link waves-effect" to="/">Home</Link>
            </li>)


        return (
            <header>
                <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
                    <div className="container-fluid">
                        <a className="navbar-brand waves-effect" href="https://mdbootstrap.com/docs/jquery/"
                           target="_blank">
                            <strong className="blue-text">MDB</strong>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {(this.props.router.location.pathname != "/") && headerLink}
                            </ul>
                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect"
                                       target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://github.com/mdbootstrap/bootstrap-material-design"
                                       className="nav-link border border-light rounded waves-effect"
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

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(HeaderComponent);






