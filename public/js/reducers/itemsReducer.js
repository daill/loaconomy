import {ITEMS_LOADING_FAILURE, ITEMS_LOADING_BEGIN, ITEMS_GET_ALL, ITEMS_GET_BY_TERM} from '../actions/itemsAction';

const initialState = {
    loading: false,
    error: null
}

export default function itemsReducer(state=initialState, action) {
    switch(action.type) {
        case ITEMS_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ITEMS_GET_ALL:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ITEMS_GET_BY_TERM:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ITEMS_LOADING_FAILURE:
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