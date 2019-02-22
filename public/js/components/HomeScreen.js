import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {getAllItems, getItemsByTerm} from '../actions/itemsActions';
import {getItemPrices} from '../actions/itemActions';

import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import PriceGraphComponent from './PriceGraphComponent';
import PriceListComponent from './PriceListComponent';
import GetItemPriceForm from './GetItemPriceForm';
import {getStats} from '../actions/statsActions';
import * as d3 from "d3";
import StatsComponent from "./StatsComponent";



class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.value = null;
    }

    findItemData(values) {
        this.props.dispatch(getItemPrices(values));
    }

    render() {
        return (<div>
                    <HeaderComponent/>
                        <div id="wrapper">
                            <div id="content-wrapper">
                                <div className="container-fluid">
                                    <div className="row wow fadeIn">
                                        <div className="col-md-9">
                                            <div className="row wow fadeIn">
                                                <div className="col-md-12 mb-4">
                                                    <div className="card shadow-nohover">
                                                        <div className="card-body">
                                                            <GetItemPriceForm onSubmit={this.findItemData.bind(this)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.props.item.prices && this.props.item.prices.length > 0 &&
                                            <div className="row wow fadeIn">
                                                <PriceListComponent/>
                                                <PriceGraphComponent item={this.props.item}/>
                                            </div>}
                                        </div>
                                        <div className="col-md-3 mb-4">
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

