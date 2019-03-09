import constants from '../utils/constants';

export const ITEM_LOADING_BEGIN   = 'ITEM_LOADING_BEGIN';
export const ITEM_LOADING_FAILURE = 'ITEM_LOADING_FAILURE';
export const ITEM_CLEAR_STATE = 'ITEM_CLEAR_STATE';


export const itemLoadingBegin = () => ({
    type: ITEM_LOADING_BEGIN,
});


export const itemLastSeenPricesLoadingBegin = () => ({
    type: ITEM_LAST_SEEN_PRICES_LOADING_BEGIN,
});

export const itemLastSeenPricesLoadingFailure = (error) => ({
    type: ITEM_LAST_SEEN_PRICES_LOADING_FAILURE,
    payload: {error},
});

export const itemLoadingFailure = (error) => ({
    type: ITEM_LOADING_FAILURE,
    payload: {error},
});

export const itemGetPrices = (resultJson, searchValues, page, sizePerPage, sortField, sortOrder) => ({
    type: ITEM_GET_PRICES,
    payload: resultJson,
    search: searchValues,
    currentPage: page,
    currentSizePerPage: sizePerPage,
    sortField: sortField,
    sortOrder: sortOrder
});


export const itemAddPrice = (resultJson) => ({
    type: ITEM_ADD_PRICE,
    payload: resultJson,
});


export const itemClearState = () => ({
    type: ITEM_CLEAR_STATE,
});

export const itemGetLastSeenPrices = (prices, period) => ({
    type: ITEM_LAST_SEEN_PRICES,
    payload: {prices: prices, period: period}

});

export function getLastSeenItemPrices(values, period) {
    return dispatch => {
        dispatch(itemLastSeenPricesLoadingBegin());

        let url = "http://localhost:8890/api/lastseenprices?i="+ values.item + "&s=" + values.server + "&p=" + period;

        return fetch(encodeURI(url)
            , {
                method: "GET"
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemGetLastSeenPrices(json, period)))
            .catch(error => dispatch(itemLastSeenPricesLoadingFailure(error)));
    };
}


export function getItemPrices(values, from, size, page, sortParam, sortOrder) {
    return dispatch => {
        dispatch(itemLoadingBegin());

        let url = "http://localhost:8890/api/prices?i="+values.item + "&s=" + values.server + "&f=" + from + "&c=" + size;
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
            .then(json => dispatch(itemGetPrices(json, values, page, size)))
            .catch(error => dispatch(itemLoadingFailure(error)));
    };
}

export function addItemPrice(itemWithPrice) {
    return dispatch => {
        dispatch(itemLoadingBegin());
        let url = "http://localhost:8890/api/price";
        return fetch(encodeURI(url)
            , {
                method: "POST",
                body: JSON.stringify(itemWithPrice)
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemAddPrice(json)))
            .catch(error => dispatch(itemLoadingFailure(error)));
    };
}

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
