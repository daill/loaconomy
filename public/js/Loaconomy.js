import React  from "react";
import { createStore, applyMiddleware, combineReducers, compose} from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Route } from 'react-router-dom'
import thunk from 'redux-thunk';
import { Link } from 'react-router-dom'
import {ConnectedRouter, routerMiddleware, connectRouter} from "connected-react-router";
import HomeScreen from "./components/HomeScreen";
import AddPriceScreen from './components/AddPriceScreen';
import ImprintScreen from './components/ImprintScreen';
import allReducers from "./reducers/index";

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({...allReducers, router: connectRouter(history)}),
    composeEnhancer(
        applyMiddleware(middleware, thunk)
    ),
);

export class Loaconomy extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={HomeScreen} />
                        <Route path="/addprice" component={AddPriceScreen} />
                        <Route path="/imprint" component={ImprintScreen} />
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}