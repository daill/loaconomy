import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

class PriceListComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6 mb-4">
                <div className="card">
                    <div className="card-header">Horizontal Bar Chart</div>
                    <div className="card-body">
                        <canvas id="horizontalBar"></canvas>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(PriceListComponent);






