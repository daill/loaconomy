import React,  { Component } from "react";
import { Link } from 'react-router-dom'

export default class ImprintScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (<div>
            <h1>About <Link to="/">Home</Link></h1>
            Imprint
        </div>);
    }
}