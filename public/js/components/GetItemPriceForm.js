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
import {addItemPrice, cleareItemState} from '../actions/itemActions';

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
    return (<div>
        <input autoComplete="off"  {...input} placeholder={placeholder} type={type} className={parsedClassName} />
        {touched && ((error && <div className="d-block invalid-feedback offset-md-2">{error}</div> || (warning && <div className="d-block invalid-feedback offset-md-2">{warning}</div>)))}
    </div>);
};


const renderInputComponent = inputProps => {
    let parsedClassName = inputProps.classes;
    if (inputProps.meta.touched && inputProps.meta.error) {
        parsedClassName += " is-invalid";
    }
    return (<div className="form-row mt-1">
        <input {...inputProps} className={parsedClassName}/>
        {inputProps.meta.touched && ((inputProps.meta.error && <div
            className="d-block invalid-feedback offset-md-2">{inputProps.meta.error}</div> || (inputProps.meta.warning &&
            <div className="d-block invalid-feedback offset-md-2">{inputProps.meta.warning}</div>)))}
    </div>);
};

const renderSuggestionsContainer = ({ containerProps , children, query }) => {
    return (<div {...containerProps} className={containerProps.className + " form-control col-md-8 offset-md-2 col-form-label"}>
        {children}
    </div>)
};


const override = css`display: inline;margin: 0 auto;`;


class GetItemPriceForm extends React.Component {

    constructor(props) {
        super(props);
    }
    

    render() {
        let dynamic = "";

        if (this.props.item && this.props.item.loading === true) {
            dynamic = " disabled";
        }

        let alert = null


        return (
            <form onSubmit={this.props.handleSubmit(v => this.props.onSubmit(v))}>
                <div className="row">
                    <div className="form-group col-md-12">
                        <div className="form-row p-2 rounded primary-color" >
                            <div className="col-md-4">
                                <div className="form-row mt-1">
                                    <label htmlFor="server" className="col-md-2 col-form-label float-right"><b>Server</b></label>
                                    <Field id="server" name="server" className={"float-right form-control col-form-label col-md-8 "+dynamic} component="select">
                                        <option>Azur Sky</option>
                                        <option>Crimson Sea</option>
                                        <option>Verdant Earth</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <Field component={AutoSuggestField} name="item" classes={"form-control col-form-label"+dynamic}/>
                            </div>
                            <div className="col-md-2 offset-md-1">
                                <button type="submit" className={"btn info-color btn-block m-0"+dynamic}>
                                    Get price data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>);
    }
}

export default reduxForm({form: 'getItemPriceForm',}) (GetItemPriceForm);