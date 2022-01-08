import loginEvent from "./loginEvent";

const loginDispatch = {
    nameOrEmailChanged: nameOrEmail => ({type: loginEvent.NAME_OR_EMAIL_CHANGED, nameOrEmail}),
    passwordChanged: password => ({type: loginEvent.PASSWORD_CHANGED, password}),
    loginRequest: ({nameOrEmail, password}) => ({type: loginEvent.LOGIN_REQUEST, nameOrEmail, password}),
    errorAdded: message => ({type: loginEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: loginEvent.CLEAR_ERRORS})
}

export default loginDispatch
