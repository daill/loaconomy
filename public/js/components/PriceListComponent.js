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
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {PaginationProvider} from 'react-bootstrap-table2-paginator';
import {getItemPrices, sortItemPrices} from "../actions/itemActions";



const monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];


class PriceListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props.item.prices.reverse();

        this.options = {
            sizePerPage: parseInt(this.props.item.currentSizePerPage),
            currSizePerPage: parseInt(this.props.item.currentSizePerPage),
            totalSize: parseInt(this.props.item.totalPriceCount)
        }

        this.columns = [
            {
                dataField: 'item',
                text: 'Item',
            },{
                dataField: 'price_per_unit',
                text: 'PPU',
                sort: true,
                formatter: this.buildPPU
            },{
                dataField: 'price',
                text: 'Price',
                sort: true,
                formatter: this.buildPrice
            }
        ]
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    buildKey(cell, row, rowIndex, formatExtraData) {
        return rowIndex;
    }

    buildLoc(cell, row) {
        let loc = "n/a";
        if (row.locationx && row.locationy) {
            loc = row.locationx + "/" + row.locationy;
        }
        return <div>{loc}</div>;
    }

    buildBonus(cell, row) {
        if (row.kind == 2) {
            return <div>atk: {cell.attack} acc: {cell.accuracy}</div>
        }
        if (row.kind == 1) {
            return <div>def: {cell.defense}</div>
        }
    }

    buildPrice(cell, row) {
        var split = getDenominationParts(cell);
        return <div>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></div>;
    }


    buildPPU(cell, row) {
        var ppu = <div>0 <img src={cImg}/></div>;
        if (cell) {
           ppu = <div>{Number(cell).toPrecision(2)} <img src={cImg}/></div>;
        }
        return ppu;
    }

    buildSeen(cell, row) {
        var seen = new Date(cell);
        var day = seen.getDate();
        var monthIndex = seen.getMonth();
        var year = seen.getFullYear();

        return <div>{day} {monthNames[monthIndex]} {year}</div>
    }

    filterPrice(cell, row) {
        return cell.type
    }


    onTableChange(type, { page, sizePerPage, sortField, sortOrder }) {
        console.log(type);

        switch(type) {
            case 'pagination':
                if (this.props.item.search) {
                    this.props.dispatch(getItemPrices(this.props.item.search, (page-1)*sizePerPage, sizePerPage, page));
                }
                break;
            case 'sort':
                console.log(sortField, sortOrder);
                var sorting = (a,b) => {
                    if (a[sortField] > b[sortField]) {
                        return sortOrder == 'asc'?1:-1;
                    }
                    if (a[sortField] < b[sortField]) {
                        return sortOrder == 'asc'?-1:1;
                    }
                    return 0;
                }
                this.props.dispatch(sortItemPrices(this.props.item.prices, sorting));
                break;
        }

    }

    componentWillMount() {
        this.options.currPage = 1;
        this.options.page = 1;
        this.options.sizePerPage = parseInt(this.props.item.currentSizePerPage);
        this.options.currSizePerPage = parseInt(this.props.item.currentSizePerPage);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.options.currPage = nextProps.item.currentPage;
        this.options.page = nextProps.item.currentPage;
        this.options.sizePerPage = parseInt(nextProps.item.currentSizePerPage);
        this.options.currSizePerPage = parseInt(nextProps.item.currentSizePerPage);
        this.options.totalSize = parseInt(nextProps.item.totalPriceCount);

    }


    render() {
        return (
            <div className="col-md-7 mb-4" id="prices">
                <div className="card shadow-nohover">
                    <div className="card-body">
                        <BootstrapTable onTableChange={this.onTableChange.bind(this)} remote bootstrap4 bordered={false} keyField="id" data={this.props.item.prices} columns={ this.columns } pagination={paginationFactory(this.options)}/>
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






