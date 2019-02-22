import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import {getStats} from "../actions/statsActions";

class StatsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getStats());
    }

    render() {

        return (
            <div className="row wow fadeIn">
                <div className="col-md-12">
                    {this.props.stats.item_stats && this.props.stats.price_stats && <div className="card shadow-nohover mb-4">
                        <div className="card-header text-center">
                            Stats
                        </div>
                        <div className="card-body">
                            <ul className="undecorated">
                                <li>{this.props.stats.item_stats.items_known} in Database</li>

                                <li>{this.props.stats.price_stats.value} prices seen</li>
                            </ul>

                        </div>
                    </div>}
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

export default connect(mapStateToProps, matchDispatchToProps)(StatsComponent);
