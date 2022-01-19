import navigationEvent from "./navigationEvent";

const navigationDispatch = {
    fetchPageRequest: () => ({type: navigationEvent.FETCH_PAGE_REQUEST}),
    fetchPageSuccess: ({pageName, loginInformation}) => ({type: navigationEvent.FETCH_PAGE_SUCCESS, pageName, loginInformation}),
    history: ({location, action}) => ({type: navigationEvent.HISTORY, location, action}),
    setUri: uri => ({type: navigationEvent.SET_URI, uri}),
    clearBrowserState: () => ({type:navigationEvent.CLEAR_BROWSER_STATE}),
    errorAdded: message => ({type: navigationEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: navigationEvent.CLEAR_ERRORS})
}

export default navigationDispatch
