import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import {getDenominationParts} from '../utils/utils';
import cImg from '../../img/c.png';
import sImg from '../../img/s.png';
import gImg from '../../img/g.png';
import pImg from '../../img/p.png';


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
        let kind = this.props.item.kind;

        this.props.item.prices.map((entry, index) => {
            var seen = new Date(entry.seen);
            var day = seen.getDate();
            var monthIndex = seen.getMonth();
            var year = seen.getFullYear();
            let split = getDenominationParts(entry.price);
            let loc = "n/a";
            if (entry.locationx && entry.locationy) {
                loc = entry.locationx + "/" + entry.locationy;
            }

            this.tableRows.push(<tr key={index}>
                <th>{entry.item}</th>
                <td>{entry.price_per_unit != undefined ? Number(entry.price_per_unit).toPrecision(2):0} <img src={cImg}/></td>
                <td>{split.p} <img src={pImg}/> {split.g} <img src={gImg}/> {split.s} <img src={sImg}/> {split.c} <img src={cImg}/> </td>
                <td>{entry.amount}</td>
                <td scope="row" >{day} {monthNames[monthIndex]} {year}</td>
                <td>{loc}</td>
                {kind == 2 && <td>{entry.bonus.attack}/{entry.bonus.accuracy}</td>}
                {kind == 1 && <td>{entry.bonus.defense}</td>}
            </tr>)
        })

        return (
            <div className="col-md-7 mb-4" id="price-list">
                <div className="card shadow-nohover">
                    <div className="card-body">
                        <table className="table table-hover borderless price-list-table">
                            <thead className="blue lighten-4">
                            <tr>
                                <th>Item</th>
                                <th>PPU <br/><small>(price per unit)</small></th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Seen</th>
                                <th>Location</th>
                                {kind == 2 && <th>AT/AC</th>}
                                {kind == 1 && <th>DE</th>}
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






