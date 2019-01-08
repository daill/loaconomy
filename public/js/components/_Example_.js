import React from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'
import { bindActionCreators } from 'redux'


export class _Example_ extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<div>
            {this.props.number}
            <h1>About <Link to="/about">About</Link></h1>
            <button onClick={() => this.props.increase(1)}>Increase</button>
            <button onClick={() => this.props.decrease(1)}>Decrease</button>
            Welcome Home
            </div>);
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({increase, decrease}, dispatch);
};

const mapStateToProps = state => {
    return {
        number: state.count.number
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(_Example_)