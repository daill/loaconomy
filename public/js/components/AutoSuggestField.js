import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutoSuggest from 'react-autosuggest';

export default class AutoSuggestField extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [],
        };
        this.parsedClassName = "";
    }

    renderSuggestionsContainer({ containerProps , children, query }){
        return (<div {...containerProps} className={containerProps.className + " " + this.parsedClassName}>
            {children}
        </div>)
    };

    renderInputComponent(inputProps) {
        this.parsedClassName = inputProps.classes;
        let localClassName = this.parsedClassName;
        if (inputProps.meta.touched && inputProps.meta.error) {
            localClassName += " is-invalid";
        }
        return (<div className="form-row mt-1 mb-1">
            <div className="col-md-12 ">
            <input {...inputProps} className={localClassName} />
            {inputProps.meta.touched && ((inputProps.meta.error && <div
                className="d-block invalid-feedback ">{inputProps.meta.error}</div> || (inputProps.meta.warning &&
                <div className="d-block invalid-feedback ">{inputProps.meta.warning}</div>)))}
            </div>
        </div>);
    };

    handleFetch({ value }) {
        if (value.length > 2) {
            let url = "http://localhost:8890/api/items?s=" + value;
            fetch(encodeURI(url), {method: "GET",})
                .then()
                .then(res => res.json())
                .then(items => {
                    if (this.props.valueSelected) {
                        this.props.valueSelected(value);
                    }
                    this.handleItemsAfterFetch(items, value);
                })
                .catch(error => console.error(error));
        }
    }

    handleItemsAfterFetch(items, value) {
        this.setState({suggestions: items})
    }

    handleClear() {
        this.setState({ suggestions: []});
    }

    handleGetSuggestion(props){
        return props.name;
    }

    handleSuggestionHighlighted({ suggestion }) {
        this.setState({ highlightedSuggestion: suggestion });
    }

    renderSuggestion(props) {
        return (
            <span>{props!= null && props.name}</span>
        );
    }

    handleSuggestionSelected(event, { suggestionValue, method, suggestionIndex }){
        const { input } = this.props;
        input.onChange(suggestionValue);
        if (this.props.valueSelected) {
            this.props.valueSelected(this.state.suggestions[suggestionIndex]);
        }
        if (method === 'enter') {
            event.preventDefault();
        }
    }

    render () {
        const { input, classes, meta } = this.props;
        input.placeholder = "Enter item name"
        return (
            <AutoSuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleFetch.bind(this)}
                onSuggestionsClearRequested={this.handleClear.bind(this)}
                getSuggestionValue={this.handleGetSuggestion.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                onSuggestionHighlighted={this.handleSuggestionHighlighted.bind(this)}
                onSuggestionSelected={this.handleSuggestionSelected.bind(this)}
                renderInputComponent={this.renderInputComponent.bind(this)}
                renderSuggestionsContainer={this.renderSuggestionsContainer.bind(this)}
                inputProps={{...input, classes, meta}}
            />
        );
    }
}