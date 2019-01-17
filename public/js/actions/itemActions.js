export const ITEM_LOADING_BEGIN   = 'ITEM_LOADING_BEGIN';
export const ITEM_LOADING_FAILURE = 'ITEM_LOADING_FAILURE';
export const ITEM_ADD_PRICE = 'ITEM_ADD_PRICE';

export const itemLoadingBegin = () => ({
    type: ITEM_LOADING_BEGIN,
});

export const itemLoadingFailure = (error) => ({
    type: ITEM_LOADING_FAILURE,
    payload: {error},
});

export const itemAddPrice = (resultJson) => ({
    type: ITEM_ADD_PRICE,
    payload: resultJson,
});


export function addItemPrice(itemWithPrice) {
    return dispatch => {
        dispatch(itemLoadingBegin());
        let url = "http://localhost:8890/api/items?s="+term;
        console.log("called term");
        return fetch(encodeURI(url)
            , {
                method: "GET",
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemAddPrice(json)))
            .catch(error => dispatch(itemLoadingFailure(error)));
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
