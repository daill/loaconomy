import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import loalogo from '../../img/loa.png';

class FooterComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer text-center font-small mt-4 wow fadeIn">
                <div className="row">
                    <div className="pt-4 col-md-3 m-auto offset-md-4">
                        <a className="btn btn-outline-white m-auto" href="https://legendsofaria.com" target="_blank"
                           role="button">
                            <img className="loa-logo" src={loalogo}></img>
                        </a>
                        <hr className="my-4" />


                        <div className="pb-4">
                            <a href="https://twitter.com/daill" target="_blank">
                                <i className="fab fa-twitter mr-3"></i>
                            </a>

                            <a href="https://github.com/daill" target="_blank">
                                <i className="fab fa-github mr-3"></i>
                            </a>

                            <Link className="waves-effect ml-2" to="/imprint">Imprint</Link>
                        </div>

                    </div>
                </div>

                <div className="footer-copyright py-3">
                    © 2018 Copyright: <a href="https://daill.de" target="_blank"> daill.de </a>
                </div>
            </footer>);
    }
}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(FooterComponent);






