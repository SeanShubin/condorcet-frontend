import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    navigate: destination => ({type: dashboardEvent.NAVIGATE, destination}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
