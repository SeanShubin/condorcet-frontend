import styleEvent from "./styleEvent";

const styleDispatch = {
    initialize: query => ({type:styleEvent.INITIALIZE, query}),
    errorAdded: message => ({type: styleEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: styleEvent.CLEAR_ERRORS})
}

export default styleDispatch
