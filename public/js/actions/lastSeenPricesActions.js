import constants from '../utils/constants';
import {PRICE_CLEAR_STATE} from "./priceActions";

export const LAST_SEEN_PRICES_GET = 'LAST_SEEN_PRICES_GET';
export const LAST_SEEN_PRICES_LOADING_BEGIN = 'LAST_SEEN_PRICES_LOADING_BEGIN';
export const LAST_SEEN_PRICES_LOADING_FAILURE = 'LAST_SEEN_PRICES_LOADING_FAILURE';
export const LAST_SEEN_PRICES_CLEAR_STATE = 'LAST_SEEN_PRICES_CLEAR_STATE';

export const lastSeenPricesLoadingBegin = () => ({
    type: LAST_SEEN_PRICES_LOADING_BEGIN,
});

export const lastSeenPricesLoadingFailure = (error) => ({
    type: LAST_SEEN_PRICES_LOADING_FAILURE,
    payload: {error},
});

export const lastSeenPricesGet = (prices, period) => ({
    type: LAST_SEEN_PRICES_GET,
    payload: {prices: prices, period: period}

});

export const lastSeenPricesClearState = () => ({
    type: LAST_SEEN_PRICES_CLEAR_STATE,
});


export function getLastSeenItemPrices(values, period) {
    return dispatch => {
        dispatch(lastSeenPricesLoadingBegin());

        let url = "http://localhost:8890/api/lastseenprices?i="+ values.item + "&s=" + values.server + "&p=" + period;

        return fetch(encodeURI(url)
            , {
                method: "GET"
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(lastSeenPricesGet(json, period)))
            .catch(error => dispatch(lastSeenPricesLoadingFailure(error)));
    };
}

export function clearLastSeenPricesState() {
    return dispatch => dispatch(lastSeenPricesClearState());
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
