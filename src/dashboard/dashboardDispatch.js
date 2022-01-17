import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    initialize: query => ({type:dashboardEvent.INITIALIZE, query}),
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    fetchCountsRequest: () => ({type: dashboardEvent.FETCH_COUNTS_REQUEST}),
    fetchCountsSuccess: counts => ({type: dashboardEvent.FETCH_COUNTS_SUCCESS, counts}),
    clearErrors: () => ({type: dashboardEvent.CLEAR_ERRORS}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
