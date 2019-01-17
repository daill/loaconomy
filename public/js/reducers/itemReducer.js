import {ITEM_LOADING_BEGIN, ITEM_LOADING_FAILURE, ITEM_ADD_PRICE} from '../actions/itemActions';

const initialState = {
    loading: false,
    error: null
}

export default function itemsReducer(state=initialState, action) {
    switch(action.type) {
        case ITEM_LOADING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case ITEM_ADD_PRICE:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };

        case ITEM_LOADING_FAILURE:
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
