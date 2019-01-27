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
        this.formValues = {server: "Azur Sky"};
        this.props.dispatch(addItemPrice(values));
        this.props.dispatch(reset('addPriceForm'));

    }

    onChangeField(field, value) {
        this.formValues[field] = value;
    }

    getDenominationParts(value) {
        let c = 0,s = 0,g = 0,p = 0
        let platinValue = 1000000;
        if (value && value > 0) {
            let calc = value + '';
            let lng = calc.length;
            c = parseInt(calc.substr(lng-2, 2));
            if (lng > 2) {
                s = parseInt(calc.substr(lng-(4-(lng%2)), 2-(lng%2)));
            }
            if (lng > 4) {
                g = parseInt(calc.substr(lng-(6-(lng%2)), 2-(lng%2)));
            }
            if (lng > 6) {
                p = parseInt(calc.substr(0,lng-(6-(lng%2))));
            }
        }

        return {c, s, g, p}
    }



    render() {

        const split = this.getDenominationParts(this.formValues.price)
        let perUnit = {c: 0, s: 0, g: 0, p: 0};

        if(this.formValues.amount && this.formValues.price && this.formValues.price > 0) {
            perUnit = this.getDenominationParts(Math.trunc(this.formValues.price/this.formValues.amount))
        }
        
        return (<div>
            <HeaderComponent/>
            <main className="mx-lg-5">
                <div className="container-fluid mt-5">
                    <div className="row wow fadeIn">
                        <div className="col-md-4 offset-md-4 mb-4">
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
                                            <td className="text-left w-50 pl-1 border-0 p-0">{this.formValues.item}</td>
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
                                            <td scope="row" className="text-right w-30 border-0 p-0">Price splitted:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{split.c} <img src={cImg}/> {split.s} <img src={sImg}/> {split.g} <img src={gImg}/> {split.p} <img src={pImg}/></td>
                                        </tr>
                                        <tr>
                                            <td scope="row" className="text-right w-30 border-0 p-0">Price per unit:</td>
                                            <td className="text-left w-50 pl-1 border-0 p-0">{perUnit.c} <img src={cImg}/> {perUnit.s} <img src={sImg}/> {perUnit.g} <img src={gImg}/> {perUnit.p} <img src={pImg}/></td>
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

