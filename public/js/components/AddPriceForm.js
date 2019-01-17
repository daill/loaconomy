import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form'
import AutoSuggesComponent from './AutoSuggestComponent';

const required = value => value ? undefined : 'Required';
const minLength = min => value => value && value.length > min ? `Must be ${min} characters or more` : undefined;
const minLength3 = minLength(3);

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}  className="form-control col-md-8 offset-md-2 col-form-label"  />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

class AddPriceForm extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(v => this.props.onSubmit(v))}>
                <div className="row">
                    <div className="form-group col-md-6 offset-md-3">
                        <div className="row p-2 rounded" style={{border: "2px solid red"}}>
                            <label htmlFor="server" className="col-md-2 offset-md-3 col-form-label">Server</label>
                            <Field id="server" name="server" className="form-control col-md-4" component="select">
                                <option>Azur Sky</option>
                                <option>Crimson Sea</option>
                                <option>Verdant Earth</option>
                            </Field>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-8 offset-md-2" style={{padding: 0}}>
                                <AutoSuggesComponent validate={[ required, minLength3 ]} idName="item" dispatch={this.props.dispatch}/>
                            </div>
                        </div>

                        <div className="row mt-1">
                            <Field validate={required} placeholder="Amount" component={renderField} name="amount" className="form-control col-md-8 offset-md-2 col-form-label"  type="number" id="amount"></Field>
                        </div>
                        <div className="row mt-1">
                            <Field validate={required} placeholder="Price in copper" component={renderField} name="price" type="number" id="price"></Field>
                        </div>
                        <div className="row mt-1">
                            <div id="location" className="col-md-8 offset-md-2">
                                <div className="row">
                                    <Field placeholder="Location x" component="input" name="locationx" className="form-control col-md-6"  type="number" step="0.01" id="locationx"></Field>
                                    <Field placeholder="Location y" component="input" name="locationy" className="form-control col-md-6"  type="number" step="0.01" id="locationy"></Field>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn info-color-dark form-control m-0 mt-5">Add price</button>
                    </div>

                </div>
            </form>);
    }
}

export default reduxForm({form: 'addPrice',}) (AddPriceForm);









