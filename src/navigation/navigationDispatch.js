import navigationEvent from "./navigationEvent";

const navigationDispatch = {
    fetchPageRequest: () => ({type: navigationEvent.FETCH_PAGE_REQUEST}),
    fetchPageSuccess: ({userName, pageName, role}) => ({type: navigationEvent.FETCH_PAGE_SUCCESS, pageName, userName, role}),
    history: ({location, action}) => ({type: navigationEvent.HISTORY, location, action}),
    redirect: uri => ({type: navigationEvent.REDIRECT, uri}),
    setUri: uri => ({type: navigationEvent.SET_URI, uri}),
    errorAdded: message => ({type: navigationEvent.ERROR_ADDED, message})
}

export default navigationDispatch
