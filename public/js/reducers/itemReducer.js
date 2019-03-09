import {
    ITEM_LOADING_BEGIN,
    ITEM_LOADING_FAILURE,
    ITEM_ADD_PRICE,
    ITEM_CLEAR_STATE,
    ITEM_GET_PRICES,
    ITEM_SORT_PRICES, ITEM_LAST_SEEN_PRICES, ITEM_LAST_SEEN_PRICES_LOADING_FAILURE
} from '../actions/itemActions';

const initialState = {
    loading: false,
    error: null
}

export default function itemReducer(state=initialState, action) {
    switch(action.type) {
        case ITEM_LOADING_BEGIN, ITEM_LAST_SEEN_PRICES_LOADING_FAILURE:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ITEM_CLEAR_STATE:
            return initialState;

        case ITEM_GET_PRICES:
            return {
                ...state,
                loading: false,
                ...action.payload.item,
                totalPriceCount: action.payload.totalCount,
                search: action.search,
                currentPage: action.currentPage,
                currentSizePerPage: action.currentSizePerPage,
                prices: action.payload.prices
            };

        case ITEM_ADD_PRICE:
            return {
                ...state,
                loading: false,
                ...action.payload
            };

        case ITEM_LOADING_FAILURE, ITEM_LAST_SEEN_PRICES_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                payload: {...action.payload}
            };


        case ITEM_SORT_PRICES:
            return {
                ...state,
                prices: action.payload
            };

        case ITEM_LAST_SEEN_PRICES:
            return {
                ...state,
                last_seen_prices: action.payload.prices,
                period: action.payload.period
            };

        default:
            return {...state}
    }
}
