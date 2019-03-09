import {
    ITEM_LOADING_BEGIN,
    ITEM_LOADING_FAILURE,
    ITEM_ADD_PRICE,
    ITEM_CLEAR_STATE,
    ITEM_GET_PRICES,
    ITEM_SORT_PRICES, ITEM_LAST_SEEN_PRICES, ITEM_LAST_SEEN_PRICES_LOADING_FAILURE
} from '../actions/itemActions';
import {PRICES_CLEAR_STATE, PRICES_GET, PRICES_LOADING_BEGIN, PRICES_LOADING_FAILURE} from "../actions/pricesActions";
import {PRICE_CLEAR_STATE} from "../actions/priceActions";

const initialState = {
    loading: false,
    error: null
}

export default function pricesReducer(state=initialState, action) {
    switch(action.type) {
        case PRICES_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PRICES_CLEAR_STATE:
            return initialState;

        case PRICES_GET:
            return {
                ...state,
                loading: false,
                ...action.payload.item,
                totalPriceCount: action.payload.totalCount,
                search: action.search,
                currentPage: action.currentPage,
                currentSizePerPage: action.currentSizePerPage,
                currentSortField: action.sortField,
                currentSortOrder: action.sortOrder,
                values: action.payload.prices
            };

        case PRICES_LOADING_FAILURE:
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
