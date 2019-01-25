import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

class PriceGraphComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-7 mb-4">
                <div className="card shadow-nohover">
                    <div className="card-body">
                        <table className="table table-hover">

                            <thead className="blue lighten-4">
                            <tr>
                                <th>#</th>
                                <th>Lorem</th>
                                <th>Ipsum</th>
                                <th>Dolor</th>
                            </tr>
                            </thead>



                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Cell 1</td>
                                <td>Cell 2</td>
                                <td>Cell 3</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Cell 4</td>
                                <td>Cell 5</td>
                                <td>Cell 6</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Cell 7</td>
                                <td>Cell 8</td>
                                <td>Cell 9</td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(PriceGraphComponent);






