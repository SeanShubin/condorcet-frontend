import manageUsersEvent from "./manageUsersEvent";

const manageUsersDispatch = {
    fetchUsersRequest: () => ({type: manageUsersEvent.FETCH_USERS_REQUEST}),
    usersChanged: users => ({type: manageUsersEvent.USERS_CHANGED, users}),
    updateUserRoleRequest: ({name, role}) => ({type: manageUsersEvent.UPDATE_USER_ROLE_REQUEST, name, role}),
    errorAdded: message => ({type: manageUsersEvent.ERROR_ADDED, message})
}

export default manageUsersDispatch
