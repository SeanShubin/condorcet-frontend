import navigationEvent from "./navigationEvent";

const navigationDispatch = {
    fetchPageRequest: navigableComponents => ({type: navigationEvent.FETCH_PAGE_REQUEST, navigableComponents}),
    fetchPageSuccess: ({pageName, loginInformation}) => ({type: navigationEvent.FETCH_PAGE_SUCCESS, pageName, loginInformation}),
    history: ({location, action}) => ({type: navigationEvent.HISTORY, location, action}),
    setUri: uri => ({type: navigationEvent.SET_URI, uri}),
    errorAdded: message => ({type: navigationEvent.ERROR_ADDED, message})
}

export default navigationDispatch
