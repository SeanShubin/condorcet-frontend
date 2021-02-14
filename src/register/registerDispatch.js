import registerEvent from "./registerEvent";

const registerDispatch = {
    nameChanged: name => ({type: registerEvent.NAME_CHANGED, name}),
    emailChanged: email => ({type: registerEvent.EMAIL_CHANGED, email}),
    passwordChanged: password => ({type: registerEvent.PASSWORD_CHANGED, password}),
    confirmationPasswordChanged: confirmationPassword => ({
        type: registerEvent.CONFIRMATION_PASSWORD_CHANGED,
        confirmationPassword
    }),
    passwordDoesNotMatchConfirmationPassword: ({
                                                   password,
                                                   confirmationPassword
                                               }) => ({
        type: registerEvent.PASSWORD_DOES_NOT_MATCH_CONFIRMATION_PASSWORD,
        password,
        confirmationPassword
    }),
    registerRequest: ({name, email, password}) => ({type: registerEvent.REGISTER_REQUEST, name, email, password}),
    errorAdded: message => ({type: registerEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: registerEvent.CLEAR_ERRORS})
}

export default registerDispatch
