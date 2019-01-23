import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {getAllItems, getItemsByTerm} from '../actions/itemsActions';
import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import PriceGraphComponent from './PriceGraphComponent';
import PriceListComponent from './PriceListComponent';
import GetItemPriceForm from './GetItemPriceForm';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.value = null;
    }

    findItemData() {
        console.log("§hall");
    }


    render() {
        return (<div>
                    <HeaderComponent/>
                        <main className="pt-5 mx-lg-5">
                            <div className="container-fluid mt-5">
                                <div className="card mb-4 wow fadeIn">
                                </div>

                                <div className="row wow fadeIn">
                                    <div className="col-md-9 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <GetItemPriceForm onSubmit={this.findItemData.bind(this)} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-3 mb-4">
                                        <div className="card mb-4">
                                            <Link to="/addprice" className="btn info-color">
                                                Add new price
                                            </Link>

                                        </div>

                                        <div className="card mb-4">
                                            <div className="card-header text-center">
                                                Stats
                                            </div>
                                            <div className="card-body">
                                                <span>
                                                10650 in Database
                                                199091090 Prices seen
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row wow fadeIn">
                                    <PriceListComponent/>
                                    <PriceGraphComponent/>
                                </div>


                            </div>
                        </main>
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

