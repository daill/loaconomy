import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutoSuggest from 'react-autosuggest';

const suggestions = [
    { label: 'Apple', value: 1 },
    { label: 'Aqua', value: 2 },
    { label: 'Banana', value: 3 },
    { label: 'Bean', value: 4 },
    { label: 'Date', value: 5 },
];

const renderInputComponent = inputProps => (
    <div className="form-row mt-1">
        <input {...inputProps} className={inputProps.classes}/>
        {inputProps.touched && ((inputProps.error && <div className="d-block invalid-feedback offset-md-2">{inputProps.error}</div> || (inputProps.warning && <div className="d-block invalid-feedback offset-md-2">{inputProps.warning}</div>)))}
    </div>
);

const renderSuggestionsContainer = ({ containerProps , children, query }) => {
    return (<div {...containerProps} className={containerProps.className + " form-control col-md-8 offset-md-2 col-form-label"}>
        {children}
    </div>)
};

export default class AutoSuggestField extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [],
        };
    }

    handleFetch({ value }) {
        let url = "http://localhost:8890/api/items?s="+value;
        console.log("called term");
        fetch(encodeURI(url), {method: "GET",})
            .then()
            .then(res => res.json())
            .then(items => this.handleItemsAfterFetch(items))
            .catch(error => console.error(error));
    }

    handleItemsAfterFetch(items) {
        let localSuggestions = [];
        let itemName = null;
        for(let i = 0; i < items.length; i++) {
            let itemName = items[i].name;
            localSuggestions.push(itemName);
        }
        this.setState({suggestions: localSuggestions})
    }

    handleClear() {
        this.setState({ suggestions: [] });
    }

    handleGetSuggestion(props){
        return props;
    }

    handleSuggestionHighlighted({ suggestion }) {
        this.setState({ highlightedSuggestion: suggestion });
    }

    renderSuggestion(props) {
        return (
            <span>{props}</span>
        );
    }



    handleSuggestionSelected(event, { suggestionValue, method }){
        const { input } = this.props;
        input.onChange(suggestionValue);
        if (method === 'enter') {
            event.preventDefault();
        }
    }

    render () {
        const { input, classes } = this.props;
        const { container } = this.props;
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
                renderInputComponent={renderInputComponent}
                renderSuggestionsContainer={renderSuggestionsContainer}
                inputProps={{...input, classes}}
                containerProps={classes}
            />
        );
    }
}