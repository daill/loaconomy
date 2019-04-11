import {host} from '../utils/constants';

export const ITEM_LOADING_BEGIN   = 'ITEM_LOADING_BEGIN';
export const ITEM_LOADING_FAILURE = 'ITEM_LOADING_FAILURE';
export const ITEM_CLEAR_STATE = 'ITEM_CLEAR_STATE';


export const itemLoadingBegin = () => ({
    type: ITEM_LOADING_BEGIN,
});

export const itemLoadingFailure = (error) => ({
    type: ITEM_LOADING_FAILURE,
    payload: {error},
});

export const itemClearState = () => ({
    type: ITEM_CLEAR_STATE,
});

export function clearItemState() {
    return dispatch => dispatch(itemClearState());
}


// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        if (response.status >= 400){
            throw Error("error");
        }
        throw Error(response.statusText);
    }
    return response;
}
