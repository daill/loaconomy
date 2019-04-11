import {host} from '../utils/constants';

export const PRICE_LOADING_BEGIN   = 'PRICES_LOADING_BEGIN';
export const PRICE_LOADING_FAILURE = 'PRICES_LOADING_FAILURE';
export const PRICE_ADD = 'PRICES_ADD';
export const PRICE_CLEAR_STATE = 'PRICES_CLEAR_STATE';

export const priceLoadingBegin = () => ({
    type: PRICE_LOADING_BEGIN,
});

export const priceLoadingFailure = (error) => ({
    type: PRICE_LOADING_FAILURE,
    payload: {error},
});

export const priceAdd = (resultJson) => ({
    type: PRICE_ADD,
    payload: resultJson,
});

export const priceClearState = () => ({
    type: PRICE_CLEAR_STATE,
});

export function clearPriceState() {
    return dispatch => dispatch(priceClearState());
}

export function addPrice(itemWithPrice) {
    return dispatch => {
        dispatch(priceLoadingBegin());
        let url = host+"/api/price";
        return fetch(encodeURI(url)
            , {
                method: "POST",
                body: JSON.stringify(itemWithPrice)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(priceAdd(json)))
            .catch(error => dispatch(priceLoadingFailure(error)));
    };
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
