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
import {getDenominationParts} from '../utils/utils';
import cImg from '../../img/c.png';
import sImg from '../../img/s.png';
import gImg from '../../img/g.png';
import pImg from '../../img/p.png';



class AddPriceScreen extends React.Component {

    constructor(props) {
        super(props);

        this.suggestions = [];
        this.itemInput = React.createRef();
        this.suggestionList = React.createRef();
        this.formValues = {server: "Azur Sky"};
    }

    addItem(values){
        values.price_per_unit = this.formValues.price/this.formValues.amount;
        values.kind = parseInt(values.kind);
        this.props.dispatch(addItemPrice(values));
        this.props.dispatch(reset('addPriceForm'));
    }

    onChangeField(field, value) {
        this.formValues[field] = value;
    }

    render() {

        const split = getDenominationParts(this.formValues.price)

        if (this.formValues.amount && this.formValues.amount > 0 && this.formValues.price && this.formValues.price > 0) {
            this.formValues.price_per_unit = this.formValues.price/this.formValues.amount;
        } else {
            this.formValues.price_per_unit = 0;
        }

        return (<div>
            <HeaderComponent/>
            <main className="mx-lg-5">
                <div className="container-fluid mt-5">
                    <div className="row wow fadeIn">
                        <div className="col-md-5 offset-md-3 mb-4">
                            <div className="card shadow-nohover">
                                <div className="card-body">
                                    <AddPriceForm item={this.props.item} onChangeField={this.onChangeField.bind(this)} onSubmit={this.addItem.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card shadow-nohover">
                                <div className="card-header text-center">
                                    Details
                                </div>
                                <div className="card-body">
                                    <table className="table table-borderless">
                                        <tbody>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Server:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.server}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Item:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.item != undefined && this.formValues.item.name}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Amount:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.amount}</td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Price:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.price != undefined ?this.formValues.price:0} <img src={cImg}/></td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Price per unit:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.price_per_unit != undefined ?this.formValues.price_per_unit:0} <img src={cImg}/></td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Price splitted:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{split.c} <img src={cImg}/> {split.s} <img src={sImg}/> {split.g} <img src={gImg}/> {split.p} <img src={pImg}/></td>
                                        </tr>
                                        </tbody>
                                    </table>
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

