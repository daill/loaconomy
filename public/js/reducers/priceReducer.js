import {
    ITEM_LOADING_BEGIN,
    ITEM_LOADING_FAILURE,
    ITEM_ADD_PRICE,
    ITEM_CLEAR_STATE,
    ITEM_GET_PRICES,
    ITEM_SORT_PRICES, ITEM_LAST_SEEN_PRICES, ITEM_LAST_SEEN_PRICES_LOADING_FAILURE
} from '../actions/itemActions';
import {PRICE_ADD, PRICE_CLEAR_STATE, PRICE_LOADING_BEGIN, PRICE_LOADING_FAILURE} from "../actions/priceActions";
import {PRICES_GET} from "../actions/pricesActions";

const initialState = {
    loading: false,
    error: null
}

export default function priceReducer(state=initialState, action) {
    switch(action.type) {
        case PRICE_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PRICE_CLEAR_STATE:
            return initialState;

        case PRICE_ADD:
            return {
                ...state,
                loading: false,
                ...action.payload
            };

        case PRICE_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                payload: {...action.payload}
            };


        default:
            return {...state}
    }
}
