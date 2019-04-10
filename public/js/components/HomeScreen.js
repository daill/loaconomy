import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";

import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import PriceGraphComponent from './PriceGraphComponent';
import PriceListComponent from './PriceListComponent';
import GetItemPriceForm from './GetItemPriceForm';
import * as d3 from "d3";
import StatsComponent from "./StatsComponent";
import {getItemPrices} from "../actions/pricesActions";
import {getLastSeenItemPrices} from "../actions/lastSeenPricesActions";

const period = 365;

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.value = null;
    }

    findItemData(values) {
        this.props.dispatch(getItemPrices(values, 0, 10, 1, "price_per_unit", "asc"));
        this.props.dispatch(getLastSeenItemPrices(values, period));
    }

    render() {
        var pricesOlderThenPeriod = <div className="col-md-5 mb-4">
            <div className="row wow fadeIn">
                <div className="col-md-12">
                    <div className="card shadow-nohover mb-4">
                        <div className="card-header">Details</div>
                        <div className="card-body">
                            <span>Prices older then {period} days. Details not available.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

        return (<div>
                    <HeaderComponent/>
                        <div id="wrapper">
                            <div id="content-wrapper">
                                <div className="container-fluid">
                                    <div className="row wow fadeIn">
                                        <div className="col-md-10">
                                            <div className="row wow fadeIn">
                                                <div className="col-md-12 mb-4">
                                                    <div className="card shadow-nohover">
                                                        <div className="card-body">
                                                            <GetItemPriceForm onSubmit={this.findItemData.bind(this)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row wow fadeIn">
                                                {this.props.prices && this.props.prices.loading == false && this.props.prices.values && this.props.prices.values.length > 0 && <PriceListComponent/>}
                                                {this.props.last_seen_prices && this.props.last_seen_prices.loading == false && this.props.last_seen_prices.values && this.props.last_seen_prices.values.length > 0 && <PriceGraphComponent/>}
                                                {this.props.prices && this.props.prices.loading == false && this.props.prices.values && this.props.prices.values.length > 0 && this.props.last_seen_prices && this.props.last_seen_prices.loading == false && !this.props.last_seen_prices.values  && pricesOlderThenPeriod}
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-4">
                                            <div className="row wow fadeIn">
                                                <div className="col-md-12">
                                                    <div className="card shadow-nohover mb-4">
                                                        <div className="card-body">
                                                        <Link to="/addprice" className="btn btn-success w-100">
                                                            Add price
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                           <StatsComponent/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            <FooterComponent/>
        </div>);
    }

}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);

