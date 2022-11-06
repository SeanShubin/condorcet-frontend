import userEvent from "./userEvent";

const userDispatch = {
    initialize: ({query, loginInformation}) => ({type:userEvent.INITIALIZE, query, loginInformation}),
    nameChanged: name => ({type:userEvent.NAME_CHANGED, name}),
    emailChanged: email => ({type:userEvent.EMAIL_CHANGED, email}),
    updateUserRequest: ({name, updates}) => ({type: userEvent.UPDATE_USER_REQUEST, name, updates}),
    fetchUserRequest: name => ({type:userEvent.FETCH_USER_REQUEST, name}),
    fetchUserSuccess: ({name, email}) => ({type:userEvent.FETCH_USER_SUCCESS, name, email}),
    errorAdded: message => ({type: userEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: userEvent.CLEAR_ERRORS})
}

export default userDispatch
