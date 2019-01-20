import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {addItemPrice} from '../actions/itemActions';
import {getAllItems, getItemsByTerm, itemsInputChange} from '../actions/itemsActions';
import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import AddPriceForm from './AddPriceForm';


class AddPriceScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.itemInput = React.createRef();
        this.suggestionList = React.createRef();
    }

    addItem(values){
        this.props.dispatch(addItemPrice(values));
    }

    render() {
        return (<div>
            <HeaderComponent/>
            <main className="pt-5 mx-lg-5">

                <div className="container-fluid mt-5">
                    <div className="row wow fadeIn">
                        <div className="col-md-8 offset-md-2 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <AddPriceForm onSubmit={this.addItem.bind(this)} loading={this.props.item && this.props.item.loading}/>
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

