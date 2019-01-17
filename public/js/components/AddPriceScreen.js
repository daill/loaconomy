import React from "react";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import $ from "jquery";
import {addItemPrice} from '../actions/itemActions';
import {getAllItems, getItemsByTerm, itemsInputChange} from '../actions/itemsActions';
import '../../ext/js/bootstrap';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import mapImageSrc from '../../img/Celador.jpg';
import AddPriceForm from './AddPriceForm';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.suggestions = [];
        this.itemInput = React.createRef();
        this.suggestionList = React.createRef();
    }

    addItem(values){
        console.log(values);
        console.log("called");
    }

    render() {
        return (<div>

            <HeaderComponent/>
            <main className="pt-5 mx-lg-5">
                <div className="container-fluid mt-5">
                    <div className="card mb-4 wow fadeIn">
                    </div>

                    <div className="row wow fadeIn">
                        <div className="col-md-8 offset-md-2 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <AddPriceForm onSubmit={this.addItem}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterComponent/>
        </div>);
    }

}

function mapStateToProps(state){
    return {...state};
};

function matchDispatchToProps(dispatch){
    return {dispatch};
};

export default connect(mapStateToProps, matchDispatchToProps)(HomeScreen);

