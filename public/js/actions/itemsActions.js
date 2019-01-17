export const ITEMS_LOADING_BEGIN   = 'ITEMS_LOADING_BEGIN';
export const ITEMS_LOADING_FAILURE = 'ITEMS_LOADING_FAILURE';
export const ITEMS_GET_ALL = 'ITEMS_GET_ALL';
export const ITEMS_GET_BY_TERM = 'ITEMS_GET_BY_TERM';
export const ITEMS_INPUT_CHANGE = 'ITEMS_INPUT_CHANGE';

export const itemsLoadingBegin = () => ({
    type: ITEMS_LOADING_BEGIN,
});

export const itemsLoadingFailure = (error) => ({
    type: ITEMS_LOADING_FAILURE,
    payload: {error},
});

export const itemsGetAll = (resultJson) => ({
    type: ITEMS_GET_ALL,
    payload: resultJson,
});

export const itemsGetByTerm = (resultJson, term) => ({
    type: ITEMS_GET_BY_TERM,
    payload: resultJson,
    selectedValue: term,
});

export const inputChange = (term) => ({
    type: ITEMS_INPUT_CHANGE,
    payload: term,
});

export function itemsInputChange(term) {
    return dispatch => {dispatch(inputChange(term));}
}

export function getItemsByTerm(term) {
    return dispatch => {
        dispatch(itemsLoadingBegin());
        let url = "http://localhost:8890/api/items?s="+term;
        console.log("called term");
        return fetch(encodeURI(url)
            , {
                method: "GET",
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemsGetByTerm(json, term)))
            .catch(error => dispatch(itemsLoadingFailure(error)));
    };
}

export function getAllItems() {
    return dispatch => {
        dispatch(itemsLoadingBegin());
        let url = "http://localhost:8890/api/items";
        console.log("called");
        return fetch(encodeURI(url)
            , {
                method: "GET",
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(itemsGetAll(json)))
            .catch(error => dispatch(itemsLoadingFailure(error)));
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
