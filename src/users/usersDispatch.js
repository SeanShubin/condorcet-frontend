import usersEvent from "./usersEvent";

const usersDispatch = {
    initialize: query => ({type: usersEvent.INITIALIZE, query}),
    fetchUsersRequest: () => ({type: usersEvent.FETCH_USERS_REQUEST}),
    usersChanged: users => ({type: usersEvent.USERS_CHANGED, users}),
    updateUserRoleRequest: ({userName, role}) => ({type: usersEvent.UPDATE_USER_ROLE_REQUEST, userName, role}),
    errorAdded: message => ({type: usersEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:usersEvent.CLEAR_ERRORS})
}

export default usersDispatch
