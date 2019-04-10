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
        if(this.props.last_seen_prices.values) {
            this.renderD3(this.props.last_seen_prices.values);
        }
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
        var errorMessage = <span>Prices older then 30 days</span>;

        var liCss = "bg-transparent border-0"

        if (this.props.last_seen_prices.values && this.props.last_seen_prices.values.length > 0) {
            var ppuStats = this.props.last_seen_prices.stats;
            var priceStats = null;
            var priceAvg = null;
            if (this.props.last_seen_prices.buckets.length > 0) {
                var biggestBucket = this.props.last_seen_prices.buckets.reduce(function(a, b) {return a.doc_count > b.doc_count ? a : b}, 0);

                var split = getDenominationParts(parseInt(biggestBucket.bucket_stats.min));
                split.c = Number(parseInt(split.c)+(biggestBucket.bucket_stats.min-parseInt(biggestBucket.bucket_stats.min))).toPrecision(2);
                var min = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
                split = getDenominationParts(parseInt(biggestBucket.bucket_stats.max));
                split.c = Number(parseInt(split.c)+(biggestBucket.bucket_stats.max-parseInt(biggestBucket.bucket_stats.max))).toPrecision(2);
                var max = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
                priceStats = <li className={liCss}><i className="fas fa-sort text-info mx-2"/>most seen prices between {min} and {max}</li>
                split = getDenominationParts(parseInt(biggestBucket.bucket_stats.avg));
                split.c = Number(parseInt(split.c)+(biggestBucket.bucket_stats.avg-parseInt(biggestBucket.bucket_stats.avg))).toPrecision(2);
                var avg = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
                priceAvg = <li className={liCss}><i className="fas fa-ruler-horizontal text-info mx-2"/> most seen prices average price {avg}</li>

            }


            var seen = new Date(this.props.last_seen_prices.values[this.props.last_seen_prices.values.length-1].seen);
            var day = seen.getDate();
            var monthIndex = seen.getMonth();
            var year = seen.getFullYear();
            var newestEntry =  <li className={liCss}><i className="fas fa-history text-info mx-2 fa-rotate-90"/> newest from {day} {monthNames[monthIndex]} {year}</li>

            var pricetrend = null;
            var recommendation = parseInt(biggestBucket.bucket_stats.avg)+parseInt(biggestBucket.bucket_stats.variance)
            split = getDenominationParts(recommendation);
            split.c = Number(parseInt(split.c)+(recommendation-parseInt(recommendation))).toPrecision(2);
            if (this.props.last_seen_prices.seen_range[0].doc_count > 2 && this.props.last_seen_prices.seen_range[1].doc_count > 2){
                var y = (this.props.last_seen_prices.seen_range[1].ppu_stats.avg-this.props.last_seen_prices.seen_range[0].ppu_stats.avg);
                var x = (this.props.last_seen_prices.seen_range[1].seen_stats.avg-this.props.last_seen_prices.seen_range[0].seen_stats.avg)/1000/60/60; //normalized to minutes
                var pitch = Number.parseFloat(y/x).toPrecision(2);

                var trendIconRotation = pitch > 0 ? 'fa-rotate-180': (pitch < 0 ? 'fa-rotate-360' : 'fa-rotate-90');
                var trendStatus = pitch > 0 ? 'rising': (pitch < 0 ? 'falling' : 'flat');
                pricetrend = <li className={liCss}><i className={"fas fa-arrow-circle-down text-info mx-2 " + trendIconRotation}/> price trend: {trendStatus} (pitch: {pitch})</li>
            }


            var priceRecommendationValue = biggestBucket.bucket_stats.avg*(pitch/10)+biggestBucket.bucket_stats.avg
            var priceRecommendationSplit = <span>{split.p >0 && split.p} {split.p >0 && <img src={pImg}/>} {split.g>0 && split.g} {split.g>0 && <img src={gImg}/>} {split.s>0 && split.s} {split.s>0 && <img src={sImg}/>} {split.c} <img src={cImg}/></span>;
            var priceRecommendation = <li className={liCss}><i className="fas fa-balance-scale text-info mx-2 "/> price recommendation: {priceRecommendationSplit} per unit</li>
        }

        return (<div className="col-md-5 mb-4">
                    <div className="row wow fadeIn">
                        <div className="col-md-12">
                            <div className="card shadow-nohover mb-4">
                                <div className="card-header">Details</div>
                                <div className="card-body">
                                    <ul className="undecorated">
                                        <li className={liCss}><i className="fas fa-database text-info mx-2"/>{this.props.prices.totalPriceCount} prices found</li>
                                        {newestEntry}
                                        {priceStats}
                                        {priceAvg}
                                        {pricetrend}
                                        {priceRecommendation}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row wow fadeIn">
                         <div className="col-md-12">
                            <div className="card shadow-nohover">
                                <div className="card-header">Price graph ({this.props.last_seen_prices.period} days)</div>
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






