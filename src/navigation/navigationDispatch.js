import navigationEvent from "./navigationEvent";

const navigationDispatch = {
    fetchPageRequest: () => ({type: navigationEvent.FETCH_PAGE_REQUEST}),
    fetchPageSuccess: ({pageName, loginInformation}) => ({type: navigationEvent.FETCH_PAGE_SUCCESS, pageName, loginInformation}),
    history: ({location, action}) => ({type: navigationEvent.HISTORY, location, action}),
    redirect: uri => ({type: navigationEvent.REDIRECT, uri}),
    setUri: uri => ({type: navigationEvent.SET_URI, uri}),
    errorAdded: message => ({type: navigationEvent.ERROR_ADDED, message})
}

export default navigationDispatch
