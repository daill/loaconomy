import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { Field, change } from 'redux-form'

export default class AutoSuggestComponent extends React.Component {

    constructor(props) {
        super(props);
        this.itemInput = React.createRef();
        this.suggestionList = React.createRef();
        this.state = {suggestions: []}
    }

    setSuggestions(items) {
        let localSuggestions = [];
        let itemName = null;
        for(let i = 0; i < items.length; i++) {
            let itemName = items[i].name;
            localSuggestions.push(<li key={itemName} onClick={() => {this.onClickItem(itemName)}} className="list-group-item list-group-item-action">
                {itemName}
            </li>);
        }
        this.setState({suggestions: localSuggestions})
    }

    handleError(response) {
        if (!response.ok) {
            if (response.status >= 400){
                throw Error("error");
            }
            throw Error(response.statusText);
        }
        return response;
    }

    retrieveSuggestions(term) {
        let url = "http://localhost:8890/api/items?s="+term;
        console.log("called term");
        fetch(encodeURI(url), {method: "GET",})
            .then()
            .then(res => res.json())
            .then(items => this.setSuggestions(items))
            .catch(error => console.error(error));
    }

    onInput(event) {
        let text = event.target.value;
        if (text.toString().length > 2) {
            this.retrieveSuggestions(text);
        } else {
            this.setState({suggestions: []})
        }
    }

    onClickItem(item) {
        this.props.dispatch(change('addPrice', 'item', item))
        this.setState({suggestions: []})
    }

    onClickInput() {
        this.setState({suggestions: []})
    }

    setFocusToSuggestions(e) {
        if (e.key === "ArrowDown"){
            if (this.state.suggestions && this.state.suggestions.length > 1) {
                console.log(this.suggestionList);
            }
        }

    }

    render() {
        return (<div>
                    <Field component="input" name="item" onClick={() => this.onClickInput()} onKeyUp={this.setFocusToSuggestions.bind(this)} ref={this.itemInput} id={this.props.idName} className="form-control col-form-label" autoComplete="off" type="text" onChange={this.onInput.bind(this)} placeholder="Item"/>
                    <ul ref={this.suggestionList} className="list-group" style={{maxHeight: 300, overflowY: "auto", zIndex: "3", position: "absolute"}}>
                        {this.state.suggestions}
                    </ul>
                </div>);
    }
}






