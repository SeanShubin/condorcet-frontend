import dashboardEvent from "./dashboardEvent";

const dashboardDispatch = {
    initialize: ({query, loginInformation}) => ({type: dashboardEvent.INITIALIZE, query, loginInformation}),
    logoutRequest: () => ({type: dashboardEvent.LOGOUT_REQUEST}),
    fetchCountsRequest: ({canViewSecrets, canManageUsers}) => ({type: dashboardEvent.FETCH_COUNTS_REQUEST, canViewSecrets, canManageUsers}),
    fetchCountsSuccess: ({
                             canViewSecrets,
                             canManageUsers,
                             userCount,
                             electionCount,
                             tableCount,
                             eventCount
                         }) => ({
        type: dashboardEvent.FETCH_COUNTS_SUCCESS,
        canViewSecrets,
        canManageUsers,
        userCount,
        electionCount,
        tableCount,
        eventCount
    }),
    clearErrors: () => ({type: dashboardEvent.CLEAR_ERRORS}),
    errorAdded: message => ({type: dashboardEvent.ERROR_ADDED, message})
}

export default dashboardDispatch
