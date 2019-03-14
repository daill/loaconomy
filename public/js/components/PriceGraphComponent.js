import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import * as d3 from "d3";
import {monthNames} from '../utils/constants';
import {getDenominationParts} from '../utils/utils';
import pImg from "../../img/p.png";
import gImg from "../../img/g.png";
import sImg from "../../img/s.png";
import cImg from "../../img/c.png";

class PriceGraphComponent extends React.Component {

    constructor(props) {
        super(props);
        this.svg = null;
    }

    componentDidMount() {
        this.renderD3(this.props.last_seen_prices.values);
    }

    renderD3(data) {
        var margin = {top: 40, right: 40, bottom: 40, left: 40},
            width = 530 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain(d3.extent(data, function(d) {return d.price_per_unit}))
            .range([height, 0]);


        var line = d3.line()
            .defined(function(d) { return d; })
            .x(function(d,i) { return x(i); })
            .y(function(d) { return y(d.price_per_unit); })
            .curve(d3.curveMonotoneX);

        this.svg = d3.select("#chart").append("svg")
            .datum(data)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(1));

        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        this.svg.append("path")
            .attr("class", "line")
            .attr("d", line);

        this.svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .attr("dy", "2em")
            .attr("fill", "#FFF")
            .text("time in days");

        this.svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("fill", "#FFF")
            .attr("transform", "rotate(-90)")
            .text("price per unit");

        /*this.svg.selectAll(".dot")
            .data(data.filter(function(d) { return d; }))
            .enter().append("circle")
            .attr("cx", line.x())
            .attr("cy", line.y())
            .attr("r", 3.5);*/
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.last_seen_prices.values && this.props.last_seen_prices.loading == true && nextProps.last_seen_prices.loading == false && nextProps.last_seen_prices.error != true){
            d3.select("#chart > svg").remove();
            this.renderD3(nextProps.last_seen_prices.values);
        }
        return false;
    }

    render() {
        var ppuStats = this.props.last_seen_prices.buckets;
        var priceStats = null;
        var priceRecommendation = null;
        if (ppuStats.length > 0) {
            var biggestBucket = ppuStats.reduce(function(a, b) {return a.doc_count > b.doc_count ? a : b}, 0);

            var split = getDenominationParts(parseInt(biggestBucket.stats.min));
            split.c = Number(parseInt(split.c)+(biggestBucket.stats.min-parseInt(biggestBucket.stats.min))).toPrecision(2);
            var min = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
            split = getDenominationParts(parseInt(biggestBucket.stats.max));
            split.c = Number(parseInt(split.c)+(biggestBucket.stats.max-parseInt(biggestBucket.stats.max))).toPrecision(2);
            var max = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
            priceStats = <li><i className="fas fa-grip-lines details-icon"></i> most seen prices between {min} and {max}</li>
            split = getDenominationParts(parseInt(biggestBucket.stats.avg));
            split.c = Number(parseInt(split.c)+(biggestBucket.stats.avg-parseInt(biggestBucket.stats.avg))).toPrecision(2);
            var avg = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
            priceRecommendation = <li><i className="fas fa-grip-lines details-icon"></i> most seen prices average price {avg}</li>
        }


        var seen = new Date(this.props.last_seen_prices.values[this.props.last_seen_prices.values.length-1].seen);
        var day = seen.getDate();
        var monthIndex = seen.getMonth();
        var year = seen.getFullYear();
        var newestEntry =  <li>newest from {day} {monthNames[monthIndex]} {year}</li>


        return (<div className="col-md-5 mb-4">
                    <div className="row wow fadeIn">
                        <div className="col-md-12">
                            <div className="card shadow-nohover mb-4">
                                <div className="card-header">Details</div>
                                <div className="card-body">
                                    <ul className="undecorated">
                                        <li>{this.props.prices.totalPriceCount} prices found</li>
                                        {newestEntry}
                                        {priceStats}
                                        {priceRecommendation}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="row wow fadeIn">
                         <div className="col-md-12">
                            <div className="card shadow-nohover">
                                <div className="card-header">Price trend ({this.props.last_seen_prices.period} days)</div>
                                <div className="card-body" id="chart"></div>
                            </div>
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






