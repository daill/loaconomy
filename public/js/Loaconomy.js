import React  from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {ConnectedRouter, routerMiddleware, connectRouter} from "connected-react-router";
import Home from "./components/Home";
import allReducers from "./reducers/index";

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    connectRouter(history)(combineReducers({allReducers, router: connectRouter(history)})),
    applyMiddleware(middleware)
);

export class Loaconomy extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={Home} />
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}