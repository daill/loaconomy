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
        let headerLink = [
            <li className="nav-item active" key="home">
                <Link className="nav-link waves-effect" to="/"><i className="fas fa-home"></i> Home</Link>
            </li>,
            <li className="nav-item active" key="addprice">
                <Link className="nav-link waves-effect" to="/addprice"><i className="fas fa-money-bill-alt"></i> Add price</Link>
            </li>,
        ]


        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                        <Link className="mr-1 w-5" to="/">
                            <img className="img-fluid" src={logo}></img>
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {headerLink}
                            </ul>
                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a href="https://twitter.com/daill" className="nav-link waves-effect"
                                       target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="https://github.com/daill"
                                       className="nav-link border border-light rounded waves-effect"
                                       target="_blank">
                                        <i className="fab fa-github mr-2"></i>GitHub
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






