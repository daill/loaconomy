import {STATS_GET, STATS_LOADING_BEGIN, STATS_LOADING_FAILURE} from '../actions/statsActions';

const initialState = {
    loading: false,
    error: null
}

export default function statsReducer(state=initialState, action) {
    switch(action.type) {
        case STATS_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case STATS_GET:
            return {
                ...state,
                loading: false,
                prices: action.payload
            };


        case STATS_LOADING_FAILURE:
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
