import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import { Field, change } from 'redux-form'
import AutoSuggestItem from './AutoSuggestItem'

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
            localSuggestions.push(<AutoSuggestItem key={itemName} itemName={itemName} onSelectItem={() => this.onClickItem(itemName)} activeClass="active" className="list-group-item list-group-item-action"/>);
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
            .then(items => this.showItems(items))
            .catch(error => console.error(error));
    }

    handleOutsideClick(e) {
        document.removeEventListener('click', this.handleOutsideClick.bind(this), false);
        this.clearList();
    }

    showItems(items){
        this.setSuggestions(items)
        document.addEventListener('click', this.handleOutsideClick.bind(this), false);
    }



    onInput(event) {
        let text = event.target.value;
        if (text.toString().length > 2) {
            this.retrieveSuggestions(text);
        } else {
            this.clearList();
        }
    }

    clearList(){
        this.setState({suggestions: []})
    }

    onClickItem(item) {
        console.log(item);
        this.props.dispatch(change('addPrice', 'item', item))
        this.clearList();
    }

    onClickInput() {
        this.clearList();
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
                    <Field validate={this.props.validate} component={this.props.component} name="item" ref={this.itemInput} id={this.props.idName} className={"form-control col-md-8 offset-md-2 col-form-label"+this.props.dynamicCSS} onChange={this.onInput.bind(this)} placeholder="Item"/>
                    <div>
                        <ul ref={this.suggestionList} className="list-group col-md-8 offset-md-2" style={{padding: 6, maxHeight: 300, overflowY: "auto", zIndex: "3", position: "absolute"}}>
                            {this.state.suggestions}
                        </ul>
                    </div>
                </div>);
    }
}






