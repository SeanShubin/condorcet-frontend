import styleEvent from "./styleEvent";

const styleDispatch = {
    initialize: ({query, loginInformation}) => ({type:styleEvent.INITIALIZE, query, loginInformation}),
    errorAdded: message => ({type: styleEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: styleEvent.CLEAR_ERRORS})
}

export default styleDispatch
