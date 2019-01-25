import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import logo from '../../img/loac.png';

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
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                        <Link className="navbar-brand mr-1" to="/">
                            <img className="logo" src={logo}></img>
                        </Link>
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
                </nav>
            </div>);
    }
}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(HeaderComponent);






