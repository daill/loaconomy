import {
    LAST_SEEN_PRICES_CLEAR_STATE,
    LAST_SEEN_PRICES_GET,
    LAST_SEEN_PRICES_LOADING_BEGIN,
    LAST_SEEN_PRICES_LOADING_FAILURE
} from "../actions/lastSeenPricesActions";

const initialState = {
    loading: false,
    error: null
}

export default function lastSeenPricesReducer(state=initialState, action) {
    switch(action.type) {
        case LAST_SEEN_PRICES_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LAST_SEEN_PRICES_CLEAR_STATE:
            return initialState;

        case LAST_SEEN_PRICES_GET:
            return {
                ...state,
                loading: false,
                values: action.payload.prices,
                buckets: action.payload.buckets,
                seen_range: action.payload.seen_range,
                stats: action.payload.stats,
                period: action.payload.period
            };

        case LAST_SEEN_PRICES_LOADING_FAILURE:
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
