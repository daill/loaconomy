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

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.value = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(nextProps.items.data && this.value.length > 1 && nextProps.items.loading == false) {
            for(let i = 0; i < nextProps.items.data.length; i++) {
                let itemName = nextProps.items.data[i].name;
                this.suggestions.push(<li key={itemName} onClick={() => {this.onClickItem(itemName)}} className="list-group-item list-group-item-action">
                    {itemName}
                </li>);
            }
        }
    }

    onClickItem(item) {
        this.suggestions = [];
        this.value = item;
        this.forceUpdate();
    }

    onInput(text) {
        this.suggestions = [];
        this.value = text;
        if (text.toString().length > 1) {
            this.props.dispatch(getItemsByTerm(text))
        } else {
            this.forceUpdate();
        }
    }

    render() {
        console.log("rendered");
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
                                
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 mb-4">
                        <div className="card mb-4">
                            <Link to="/addprice" className="btn btn-primary">
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

