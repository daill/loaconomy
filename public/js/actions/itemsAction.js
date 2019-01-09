export const ITEMS_LOADING_BEGIN   = 'ITEMS_LOADING_BEGIN';
export const ITEMS_LOADING_FAILURE = 'ITEMS_LOADING_FAILURE';
export const ITEMS_GET_ALL = 'ITEMS_GET_ALL';

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

export function getAllItems() {
    return dispatch => {
        dispatch(itemsLoadingBegin());
        let url = "http://localhost:8890/api/items";
        console.log("called");
        return fetch(url
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
