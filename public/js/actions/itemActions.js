export const ITEM_LOADING_BEGIN   = 'ITEM_LOADING_BEGIN';
export const ITEM_LOADING_FAILURE = 'ITEM_LOADING_FAILURE';
export const ITEM_ADD_PRICE = 'ITEM_ADD_PRICE';
export const ITEM_CLEAR_STATE = 'ITEM_CLEAR_STATE';
export const ITEM_GET_PRICES = 'ITEM_GET_PRICES';

export const itemLoadingBegin = () => ({
    type: ITEM_LOADING_BEGIN,
});

export const itemLoadingFailure = (error) => ({
    type: ITEM_LOADING_FAILURE,
    payload: {error},
});

export const itemGetPrices = (resultJson) => ({
    type: ITEM_GET_PRICES,
    payload: resultJson,
});


export const itemAddPrice = (resultJson) => ({
    type: ITEM_ADD_PRICE,
    payload: resultJson,
});


export const itemClearState = () => ({
    type: ITEM_CLEAR_STATE,
});


export function getItemPrices(values) {
    return dispatch => {
        dispatch(itemLoadingBegin());
        let url = "http://localhost:8890/api/prices?i="+values.item + "&s=" + values.server
        if (values.bonus) {
            url = url + "&at=" + values.bonus.attack + "&ac=" + values.bonus.accuracy + "&de=" + values.bonus.defense;
        }

        return fetch(encodeURI(url)
            , {
                method: "GET"
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemGetPrices(json)))
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

export function cleareItemState() {
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
