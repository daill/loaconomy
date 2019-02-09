export const STATS_LOADING_BEGIN   = 'STATS_LOADING_BEGIN';
export const STATS_LOADING_FAILURE = 'STATS_LOADING_FAILURE';
export const STATS_GET = 'STATS_GET_STATS';

export const statsLoadingBegin = () => ({
    type: STATS_LOADING_BEGIN,
});

export const statsLoadingFailure = (error) => ({
    type: STATS_LOADING_FAILURE,
    payload: {error},
});

export const statsGet = (resultJson) => ({
    type: STATS_GET,
    payload: resultJson,
});


export function getStats() {
    return dispatch => {
        dispatch(statsLoadingBegin());
        let url = "http://localhost:8890/api/stats";
        return fetch(encodeURI(url)
            , {
                method: "GET"
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => dispatch(statsGet(json)))
            .catch(error => dispatch(statsLoadingFailure(error)));
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
