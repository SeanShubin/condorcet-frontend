import manageUsersEvent from "./manageUsersEvent";

const manageUsersDispatch = {
    fetchUsersRequest: () => ({type: manageUsersEvent.FETCH_USERS_REQUEST}),
    usersChanged: users => ({type: manageUsersEvent.USERS_CHANGED, users}),
    updateUserRoleRequest: ({userName, role}) => ({type: manageUsersEvent.UPDATE_USER_ROLE_REQUEST, userName, role}),
    errorAdded: message => ({type: manageUsersEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:manageUsersEvent.CLEAR_ERRORS})
}

export default manageUsersDispatch
