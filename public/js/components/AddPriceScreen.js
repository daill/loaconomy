import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {addItemPrice, cleareItemState} from '../actions/itemActions';
import {getAllItems, getItemsByTerm, itemsInputChange} from '../actions/itemsActions';
import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import AddPriceForm from './AddPriceForm';
import {reset} from "redux-form";



class AddPriceScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.itemInput = React.createRef();
        this.suggestionList = React.createRef();
    }

    addItem(values){
        this.props.dispatch(addItemPrice(values));
        this.props.dispatch(reset('addPriceForm'));
    }

    render() {
        return (<div>
            <HeaderComponent/>
            <main className="mx-lg-5">
                <div className="container-fluid mt-5">
                    <div className="row wow fadeIn">
                        <div className="col-md-4 offset-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <AddPriceForm item={this.props.item} onSubmit={this.addItem.bind(this)}/>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(AddPriceScreen);

