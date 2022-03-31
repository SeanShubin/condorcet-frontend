import changePasswordEvent from "./changePasswordEvent";

const changePasswordDispatch = {
    initialize: ({query, loginInformation}) => ({type:changePasswordEvent.INITIALIZE, query, loginInformation}),
    passwordChanged: password => ({type: changePasswordEvent.PASSWORD_CHANGED, password}),
    confirmationPasswordChanged: confirmationPassword => ({
        type: changePasswordEvent.CONFIRMATION_PASSWORD_CHANGED,
        confirmationPassword
    }),
    passwordDoesNotMatchConfirmationPassword: ({
                                                   password,
                                                   confirmationPassword
                                               }) => ({
        type: changePasswordEvent.PASSWORD_DOES_NOT_MATCH_CONFIRMATION_PASSWORD,
        password,
        confirmationPassword
    }),
    changePasswordRequest: password => ({type: changePasswordEvent.CHANGE_PASSWORD_REQUEST, password}),
    errorAdded: message => ({type: changePasswordEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: changePasswordEvent.CLEAR_ERRORS})
}

export default changePasswordDispatch
