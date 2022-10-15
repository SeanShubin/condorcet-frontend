import resetPasswordEvent from "./resetPasswordEvent";

const resetPasswordDispatch = {
    initialize: ({query, loginInformation}) => ({type:resetPasswordEvent.INITIALIZE, query, loginInformation}),
    setMessage: message => ({type:resetPasswordEvent.SET_MESSAGE, message}),
    emailChanged: email => ({type: resetPasswordEvent.EMAIL_CHANGED, email}),
    resetPasswordRequest: email => ({type: resetPasswordEvent.RESET_PASSWORD_REQUEST, email}),
    errorAdded: message => ({type: resetPasswordEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: resetPasswordEvent.CLEAR_ERRORS})
}

export default resetPasswordDispatch
