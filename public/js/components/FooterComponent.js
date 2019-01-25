import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

class FooterComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="page-footer text-center font-small mt-4 wow fadeIn">
                    <div className="pt-4">
                        <a className="btn btn-outline-white" href="https://mdbootstrap.com/docs/jquery/getting-started/download/" target="_blank"
                           role="button">Legengs of Aria
                            <i className="fas fa-download ml-2"></i>
                        </a>
                    </div>

                    <hr className="my-4" />
                    <div className="pb-4">
                        <a href="https://www.facebook.com/mdbootstrap" target="_blank">
                            <i className="fab fa-facebook-f mr-3"></i>
                        </a>

                        <a href="https://twitter.com/MDBootstrap" target="_blank">
                            <i className="fab fa-twitter mr-3"></i>
                        </a>

                        <a href="https://www.youtube.com/watch?v=7MUISDJ5ZZ4" target="_blank">
                            <i className="fab fa-youtube mr-3"></i>
                        </a>

                        <a href="https://plus.google.com/u/0/b/107863090883699620484" target="_blank">
                            <i className="fab fa-google-plus mr-3"></i>
                        </a>

                        <a href="https://dribbble.com/mdbootstrap" target="_blank">
                            <i className="fab fa-dribbble mr-3"></i>
                        </a>

                        <a href="https://pinterest.com/mdbootstrap" target="_blank">
                            <i className="fab fa-pinterest mr-3"></i>
                        </a>

                        <a href="https://github.com/mdbootstrap/bootstrap-material-design" target="_blank">
                            <i className="fab fa-github mr-3"></i>
                        </a>

                        <a href="http://codepen.io/mdbootstrap/" target="_blank">
                            <i className="fab fa-codepen mr-3"></i>
                        </a>
                    </div>

                    <div className="footer-copyright py-3">
                        © 2018 Copyright: <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> MDBootstrap.com </a>
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






