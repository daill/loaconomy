import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import '../../ext/js/bootstrap';
import * as d3 from "d3";

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
        console.log("update");

        if (nextProps.last_seen_prices.values && this.props.last_seen_prices.loading == true && nextProps.last_seen_prices.loading == false && nextProps.last_seen_prices.error != true){
            d3.select("#chart > svg").remove();
            this.renderD3(nextProps.last_seen_prices.values);
        }
        return false;
    }

    render() {
        return (<div className="col-md-5 mb-4">
                    <div className="row wow fadeIn">
                        <div className="col-md-12">
                            <div className="card shadow-nohover mb-4">
                                <div className="card-body">

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






