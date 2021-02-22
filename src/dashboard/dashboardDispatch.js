import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    fetchCountsRequest: () => ({type: dashboardEvent.FETCH_COUNTS_REQUEST}),
    fetchCountsSuccess: counts => ({type: dashboardEvent.FETCH_COUNTS_SUCCESS, counts}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
