import {host} from '../utils/constants';

export const PRICES_LOADING_BEGIN   = 'PRICES_LOADING_BEGIN';
export const PRICES_LOADING_FAILURE = 'PRICES_LOADING_FAILURE';
export const PRICES_GET = 'PRICES_GET';
export const PRICES_CLEAR_STATE = 'PRICES_CLEAR_STATE';

export const pricesLoadingBegin = () => ({
    type: PRICES_LOADING_BEGIN,
});

export const pricesLoadingFailure = (error) => ({
    type: PRICES_LOADING_FAILURE,
    payload: {error},
});

export const getPrices = (resultJson, searchValues, page, sizePerPage, sortField, sortOrder) => ({
    type: PRICES_GET,
    payload: resultJson,
    search: searchValues,
    currentPage: page,
    currentSizePerPage: sizePerPage,
    sortField: sortField,
    sortOrder: sortOrder
});

export const pricesClearState = () => ({
    type: PRICES_CLEAR_STATE,
});


export function getItemPrices(values, from, size, page, sortParam, sortOrder) {
    return dispatch => {
        dispatch(pricesLoadingBegin());

        let url = host+"/api/prices?i="+values.item + "&s=" + values.server + "&f=" + from + "&c=" + size;
        if (sortParam) {
            url = url + "&sp=" + sortParam
        }

        if (sortOrder) {
            url = url + "&so=" + sortOrder
        }

        if (values.bonus) {
            url = url + "&at=" + values.bonus.attack + "&ac=" + values.bonus.accuracy + "&de=" + values.bonus.defense;
        }

        return fetch(encodeURI(url)
            , {
                method: "GET"
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(getPrices(json, values, page, size, sortParam, sortOrder)))
            .catch(error => dispatch(pricesLoadingFailure(error)));
    };
}

export function clearPricesState() {
    return dispatch => dispatch(pricesClearState());
}

export function addItemPrice(itemWithPrice) {
    return dispatch => {
        dispatch(pricesLoadingBegin());
        let url = host+"/api/price";
        return fetch(encodeURI(url)
            , {
                method: "POST",
                body: JSON.stringify(itemWithPrice)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(priceAdd(json)))
            .catch(error => dispatch(pricesLoadingFailure(error)));
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
