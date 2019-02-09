import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
import {Field, change, reduxForm, reset} from 'redux-form'
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
const minValue4000 = minValue(-4000);

const parseNumber = value => !value ? null : Number(value);

const renderField = ({ input, label, type, className, placeholder, meta: { touched, error, warning } }) => {
    let parsedClassName = className;
    if(touched && error){
        parsedClassName += " is-invalid";
    } else {
        parsedClassName = className
    }
    return (<div className="form-row mt-1">
            <input autoComplete="off"  {...input} placeholder={placeholder} type={type} className={parsedClassName} />
            {touched && ((error && <div className="d-block invalid-feedback offset-md-2">{error}</div> || (warning && <div className="d-block invalid-feedback offset-md-2">{warning}</div>)))}
    </div>);
};

const override = css`display: inline;margin: 0 auto;`;


class AddPriceForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if(this.props.item && this.props.item.status === "ok") {
            if (this.props.pristine === true && nextProps.pristine === false) {
                this.props.dispatch(cleareItemState());
            }
        }
    }

    captureSubnmit(v) {

        this.props.onSubmit(v)
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
                alert = (<div className="alert alert-danger" role="alert">Could not add pricing data</div>);
            }
        }

        return (
            <form onSubmit={this.props.handleSubmit(v => this.captureSubnmit(v))}>
                <div className="row">
                    <div className="col-md-12">
                        {alert}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-8">
                        <div className="form-row p-2 mb-3 rounded primary-color" >
                            <label htmlFor="server" className="col-md-2 offset-md-3 col-form-label">Server</label>
                            <Field onChange={(e) => this.props.onChangeField("server", e.target.value)} id="server" name="server" className={"form-control col-md-4"+dynamic} component="select">
                                <option value="Azur Sky">Azur Sky</option>
                                <option value="Crimson Sea">Crimson Sea</option>
                                <option value="Verdant Earth">Verdant Earth</option>
                            </Field>
                        </div>
                            <Field valueSelected={(e) => this.props.onChangeField("item", e)} validate={[required, maxLength24, minLength3]} component={AutoSuggestField} name="item" classes={"form-control col-md-8 offset-md-2 col-form-label"+dynamic}/>
                            <Field onChange={(e) => this.props.onChangeField("amount", e.target.value)} validate={[required, notNegative]} parse={parseNumber} placeholder="Amount" component={renderField} name="amount" className={"form-control col-md-8 offset-md-2 col-form-label"+dynamic}  type="number" id="amount"></Field>
                            <Field onChange={(e) => this.props.onChangeField("price", e.target.value)} validate={[required, notNegative]} parse={parseNumber} placeholder="Price in copper" component={renderField} name="price" type="number" id="price" className={"form-control col-md-8 offset-md-2 col-form-label"+ dynamic }></Field>
                        <div className="form-row mt-3">
                            <div className="col-md-8 offset-md-2">
                                <button type="submit" className={"btn btn-primary btn-block m-0"+dynamic}>
                                    <PulseLoader sizeUnit={"px"} size={15} color={'#000000'} loading={this.props.item && this.props.item.loading === true}/>
                                    Add price
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-row mt-5">
                            <div id="location" className="col-md-12">
                                <label htmlFor="location-row" style={{color: "#808080"}}>Optional:</label>
                                <div className="form-row" id="location-row">
                                    <Field validate={[maxValue4000, minValue4000]} onChange={(e) => this.props.onChangeField("location.x", e.target.value)} placeholder="Location x" parse={parseNumber} component={renderField} name="location.x" className={"form-control col-md-6 " + dynamic}  type="number" step="0.01" id="location.x" autoComplete="off"></Field>
                                    <Field validate={[maxValue4000, minValue4000]} onChange={(e) => this.props.onChangeField("location.y", e.target.value)} placeholder="Location y" parse={parseNumber} component={renderField} name="location.y" className={"form-control col-md-6 "+ dynamic } type="number" step="0.01" id="location.y" autoComplete="off"></Field>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>);
    }
}

export default reduxForm({
    form: 'addPriceForm',
    initialValues: defaults.defaultFormValues
}) (AddPriceForm);









