import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    fetchNameRequest: () => ({type: dashboardEvent.FETCH_NAME_REQUEST}),
    fetchNameSuccess: name => ({type: dashboardEvent.FETCH_NAME_SUCCESS, name}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
