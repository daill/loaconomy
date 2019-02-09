import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';

const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

class PriceListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.item.prices.reverse();
    }

    render() {
        this.tableRows = [];
        this.props.item.prices.map((entry, index) => {
            var seen = new Date(entry.seen);
            var day = seen.getDate();
            var monthIndex = seen.getMonth();
            var year = seen.getFullYear();


            this.tableRows.push(<tr key={index}>
                <th scope="row" >{day} {monthNames[monthIndex]} {year}</th>
                <td>{entry.item}</td>
                <td>{entry.price_per_unit}</td>
                <td>{entry.price}</td>
                <td>{entry.amount}</td>
                <td>{entry.locationx}/{entry.locationy}</td>
            </tr>)
        })

        return (
            <div className="col-md-7 mb-4" id="price-list">
                <div className="card shadow-nohover">
                    <div className="card-body">
                        <table className="table table-hover borderless">

                            <thead className="blue lighten-4">
                            <tr>
                                <th>Seen</th>
                                <th>Item</th>
                                <th>Price per unit</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Location</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.tableRows}
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

export default connect(mapStateToProps, matchDispatchToProps)(PriceListComponent);






