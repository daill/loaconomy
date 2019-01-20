import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
import { Field, change, reduxForm } from 'redux-form'
import AutoSuggest from 'react-autosuggest';
import AutoSuggestField from './AutoSuggestField';

const required = value => value ? undefined : 'Required';
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength3 = minLength(3);

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

    render() {
        let dynamic = "";

        if (this.props.loading) {
            dynamic = " disabled";
        }

        return (
            <form onSubmit={this.props.handleSubmit(v => this.props.onSubmit(v))}>
                <div className="row">
                    <div className="form-group col-md-6 offset-md-3">
                        <div className="form-row p-2 rounded primary-color" >
                            <label htmlFor="server" className="col-md-2 offset-md-3 col-form-label">Server</label>
                            <Field id="server" name="server" className={"form-control col-md-4"+dynamic} component="select">
                                <option>Azur Sky</option>
                                <option>Crimson Sea</option>
                                <option>Verdant Earth</option>
                            </Field>
                        </div>
                                <Field component={AutoSuggestField} name="item" classes={"form-control col-md-8 offset-md-2 col-form-label"+dynamic}/>
                            <Field validate={required} parse={parseNumber} placeholder="Amount" component={renderField} name="amount" className={"form-control col-md-8 offset-md-2 col-form-label"+dynamic}  type="number" id="amount"></Field>
                            <Field validate={required} parse={parseNumber} placeholder="Price in copper" component={renderField} name="price" type="number" id="price" className={"form-control col-md-8 offset-md-2 col-form-label"+ dynamic }></Field>
                        <div className="form-row mt-3">
                            <div id="location" className="col-md-8 offset-md-2">
                                <label htmlFor="location-row" style={{color: "#808080"}}>Optional:</label>
                                <div className="form-row" id="location-row">
                                    <Field placeholder="Location x" parse={parseNumber} component="input" name="locationx" className={"form-control col-md-6 " + dynamic}  type="number" step="0.01" id="locationx" autoComplete="off"></Field>
                                    <Field placeholder="Location y" parse={parseNumber} component="input" name="locationy" className={"form-control col-md-6 "+ dynamic } type="number" step="0.01" id="locationy" autoComplete="off"></Field>
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-5">
                            <div className="col-md-8 offset-md-2">
                                <button type="submit" className={"btn info-color btn-block m-0"+dynamic}>
                                <PulseLoader sizeUnit={"px"} size={15} color={'#000000'} loading={this.props.loading}/>
                                    Add price
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>);
    }
}

export default reduxForm({form: 'addPrice',}) (AddPriceForm);









