import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
import {Field, change, reduxForm, reset, formValueSelector} from 'redux-form'
import AutoSuggest from 'react-autosuggest';
import AutoSuggestField from './AutoSuggestField';
import {addItemPrice, cleareItemState} from '../actions/itemActions';
import defaults from '../utils/constants';


const required = value => value ? undefined : 'Required';
const minLength = min => value => value && value.length < min ? `Must be min ${min} characters or more` : undefined;
const maxLength = max => value => value && value.length > max ? `Must be less then ${max} characters` : undefined;
const notNegative = value => value > 0 ?  undefined : "Must be a positive number";
const maxValue = max => value => value > max ? `Must be less then ${max}`: undefined;
const minValue = min => value => value < min ? `Must be min ${min}`: undefined;

const minLength3 = minLength(3);
const maxLength24 = maxLength(24);
const maxValue4000 = maxValue(4000);
const maxValue3 = maxValue(3);
const maxValue25 = maxValue(25);
const maxValue99 = maxValue(99);
const minValue0 = minValue(0);
const minValue4000 = minValue(-4000);

const parseNumber = value => !value ? null : Number(value);

const renderField = ({ input, label, type, className, placeholder, meta: { touched, error, warning } }) => {
    let parsedClassName = className;
    if(touched && error){
        parsedClassName += " is-invalid";
    } else {
        parsedClassName = className
    }
    return (<div className="form-row mb-1">
        <div className="col-md-12">
            <input autoComplete="off"  {...input} placeholder={placeholder} type={type} className={parsedClassName} />
            {touched && ((error && <div className="d-block invalid-feedback">{error}</div> || (warning && <div className="d-block invalid-feedback">{warning}</div>)))}
        </div>
    </div>);
};

const override = css`display: inline;margin: 0 auto;`;
class AddPriceForm extends React.Component {

    constructor(props) {
        super(props);
        this.currentItemKind = null;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.props.item && this.props.item.status === "ok") {
            if (this.props.pristine === true && nextProps.pristine === false) {
                this.props.dispatch(cleareItemState());
            }
        }
    }

    captureSubmit(v) {
        this.props.onSubmit(v)
    }

    setCurrentItem(kind) {
        const currentKind = selector(this.state, 'kind')
        if (kind != undefined && kind != this.props.currentKind){
            this.props.dispatch(change('addPriceForm', 'kind', kind))
        }
    }

    render() {
        let dynamic = "";

        if (this.props.item && this.props.item.loading === true) {
            dynamic = " disabled";
        }

        let alert = null

        if (this.props.item) {
            if (this.props.item.status === "ok" && this.props.pristine === true) {
                alert = (<div className=" alert alert-success" role="alert">Pricing data successfully added</div>);
            } else if (this.props.item.status === "error" || this.props.item.error === true){
                alert = (<div className="alert alert-danger" role="alert">Could not add pricing data<br/> {this.props.item.error_message}</div>);
            }
        }

        return (
            <form onSubmit={this.props.handleSubmit(v => this.captureSubmit(v))}>
                <div className="row">
                    <div className="col-md-12">
                        {alert}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-6 offset-md-1">
                        <div className="form-row rounded primary-color" >
                            <div className="col-md-4 mb-3">
                            <label htmlFor="server" className="">Server</label>
                            <Field onChange={(e) => this.props.onChangeField("server", e.target.value)} id="server" name="server" className={"form-control "+dynamic} component="select">
                                <option value="Azur Sky">Azur Sky</option>
                                <option value="Crimson Sea">Crimson Sea</option>
                                <option value="Verdant Earth">Verdant Earth</option>
                            </Field>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label htmlFor="kind" className="">Kind</label>
                                <Field onChange={(e) => {this.props.onChangeField("kind", e.target.value)}} id="kind" name="kind" className={"form-control "+dynamic} component="select">
                                    <option value="0">Misc</option>
                                    <option value="1">Armor</option>
                                    <option value="2">Weapon</option>
                                </Field>
                            </div>
                        </div>
                            <label htmlFor="pricing-data">Pricing data</label>
                            <div id="pricing-data">
                                <Field valueSelected={(e) => {this.setCurrentItem(e.kind); this.props.onChangeField("item", e)}} validate={[required, maxLength24, minLength3]} component={AutoSuggestField} name="item" classes={"form-control "+dynamic}/>
                                <Field onChange={(e) => this.props.onChangeField("amount", e.target.value)} validate={[required, notNegative]} parse={parseNumber} placeholder="Amount" component={renderField} name="amount" className={"form-control "+dynamic}  type="number" id="amount"></Field>
                                <Field onChange={(e) => this.props.onChangeField("price", e.target.value)} validate={[required, notNegative]} parse={parseNumber} placeholder="Price in copper" component={renderField} name="price" type="number" id="price" className={"form-control "+ dynamic }></Field>
                            </div>
                        <div className="form-row mt-3">
                            <div className="col-md-8">
                                <button type="submit" className={"btn btn-primary btn-block m-0 "+dynamic}>
                                    <PulseLoader sizeUnit={"px"} size={15} color={'#000000'} loading={this.props.item && this.props.item.loading === true}/>
                                    Add price
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-3 offset-md-1">
                        <div className="form-row">
                            <label htmlFor="location">Location</label>
                            <div id="location" className="col-md-12">
                                <div className="form-row">

                                    <div className="col-md-6">
                                        <Field validate={[maxValue4000, minValue4000]} onChange={(e) => this.props.onChangeField("location.x", e.target.value)} placeholder="x" parse={parseNumber} component={renderField} name="location.x" className={"form-control " + dynamic}  type="number" step="0.01" id="location.x" autoComplete="off"></Field>
                                    </div>
                                    <div className="col-md-6">
                                        <Field validate={[maxValue4000, minValue4000]} onChange={(e) => this.props.onChangeField("location.y", e.target.value)} placeholder="y" parse={parseNumber} component={renderField} name="location.y" className={"form-control "+ dynamic } type="number" step="0.01" id="location.y" autoComplete="off"></Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {(this.props.currentKind == 2)  && <div className="form-row">
                            <label htmlFor="bonus">Bonus</label>
                            <div id="bonus" className="col-md-12">
                                <div className="form-row">

                                    <div id="bonus" className="col-md-12">
                                        <Field validate={[maxValue99, minValue0]} onChange={(e) => this.props.onChangeField("bonus.attack", e.target.value)} placeholder="Attack" parse={parseNumber} component={renderField} name="bonus.attack" className={"form-control " + dynamic}  type="number" step="1" id="bonus.attack" autoComplete="off"></Field>
                                        <Field validate={[maxValue25, minValue0]} onChange={(e) => this.props.onChangeField("bonus.accuracy", e.target.value)} placeholder="Accuracy" parse={parseNumber} component={renderField} name="bonus.accuracy" className={"form-control " + dynamic}  type="number" step="1" id="bonus.accuracy" autoComplete="off"></Field>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {(this.props.currentKind == 1)  && <div className="form-row">
                            <label htmlFor="bonus">Bonus</label>
                            <div id="bonus" className="col-md-12">
                                <Field validate={[maxValue3, minValue0]} onChange={(e) => this.props.onChangeField("bonus.defense", e.target.value)} placeholder="Defense" parse={parseNumber} component={renderField} name="bonus.defense" className={"form-control " + dynamic}  type="number" step="1" id="bonus.defense" autoComplete="off"></Field>
                            </div>
                        </div>}
                    </div>
                </div>
            </form>);
    }
}

AddPriceForm = reduxForm({
    form: 'addPriceForm',
    initialValues: defaults.defaultFormValues
})(AddPriceForm);
const selector = formValueSelector('addPriceForm')

export default connect(state => {
    const currentKind = selector(state, 'kind')
    return {currentKind};
})(AddPriceForm);











