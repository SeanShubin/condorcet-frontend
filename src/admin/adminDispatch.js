import adminEvent from "./adminEvent";

const adminDispatch = {
    fetchUsersRequest: () => ({type: adminEvent.FETCH_USERS_REQUEST}),
    usersChanged: users => ({type: adminEvent.USERS_CHANGED, users}),
    updateUserRoleRequest: ({name, role}) => ({type: adminEvent.UPDATE_USER_ROLE_REQUEST, name, role}),
    errorAdded: message => ({type: adminEvent.ERROR_ADDED, message})
}

export default adminDispatch
