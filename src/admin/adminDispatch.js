import adminEvent from "./adminEvent";

const adminDispatch = {
    fetchUsersRequest: () => ({type: adminEvent.FETCH_USERS_REQUEST}),
    usersChanged: users => ({type: adminEvent.USERS_CHANGED, users}),
    errorAdded: message => ({type: adminEvent.ERROR_ADDED, message})
}

export default adminDispatch
