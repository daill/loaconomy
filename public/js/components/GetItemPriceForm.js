import React from "react";
import {connect} from 'react-redux';
import '../../ext/js/bootstrap';
import { css } from '@emotion/core';
import { Field, reset, reduxForm } from 'redux-form'
import AutoSuggestField from './AutoSuggestField';
import {maxValue25, maxValue3, maxValue99, minValue0} from "../utils/utils";
import defaults from "../utils/constants";

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

    resetForm() {
        this.props.dispatch(reset('getItemPriceForm'));
    }

    render() {
        let dynamic = "";

        if (this.props.item && this.props.item.loading === true) {
            dynamic = " disabled";
        }

        return (
            <form onSubmit={this.props.handleSubmit(v => {this.props.onSubmit(v)})}>
                <div className="row">
                    <div className="form-group col-md-12">
                        <div className="form-row p-2 rounded primary-color" >
                            <div className="col-md-4">
                                <div className="form-row mt-1">
                                    <div className="col-md-5 offset-md-7">
                                    <Field id="server" name="server" className={"float-right form-control "+dynamic} component="select">
                                        <option value="Azur Sky">Azur Sky</option>
                                        <option value="Crimson Sea">Crimson Sea</option>
                                        <option value="Verdant Earth">Verdant Earth</option>
                                    </Field>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <Field component={AutoSuggestField} name="item" classes={"form-control col-form-label "+dynamic}/>
                                <div className="row">
                                    <div id="bonus" className="col-md-12">
                                        <div className="row m-0 p-0">
                                            <div className="col-md-4 m-0 p-0">
                                        <Field validate={[maxValue99, minValue0]} placeholder="Attack" parse={parseNumber} component={renderField} name="bonus.attack" className={"form-control " + dynamic}  type="number" step="1" id="bonus.attack" autoComplete="off"></Field>
                                            </div>
                                            <div className="col-md-4 m-0 p-0">
                                        <Field validate={[maxValue25, minValue0]} placeholder="Accuracy" parse={parseNumber} component={renderField} name="bonus.accuracy" className={"form-control " + dynamic}  type="number" step="1" id="bonus.accuracy" autoComplete="off"></Field>
                                            </div>
                                                <div className="col-md-4 m-0 p-0">
                                        <Field validate={[maxValue3, minValue0]} placeholder="Defense" parse={parseNumber} component={renderField} name="bonus.defense" className={"form-control " + dynamic}  type="number" step="1" id="bonus.defense" autoComplete="off"></Field>
                                                </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className={"btn btn-primary btn-block mt-1 "+dynamic}>
                                    Get price data
                                </button>
                                <button onClick={this.resetForm.bind(this)} className={"btn btn-secondary btn-block mt-1 "+dynamic}>
                                    Reset
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>);
    }
}

GetItemPriceForm = reduxForm({
    form: 'getItemPriceForm',
    initialValues: defaults.defaultFormValues
}) (GetItemPriceForm);

export default connect(state => {
    return {"item": state.item}
})(GetItemPriceForm);