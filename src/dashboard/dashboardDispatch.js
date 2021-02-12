import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
