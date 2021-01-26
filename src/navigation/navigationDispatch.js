import navigationEvent from "./navigationEvent";

const navigationDispatch = {
    fetchPageRequest: () => ({type: navigationEvent.FETCH_PAGE_REQUEST}),
    fetchPageSuccess: page => ({type: navigationEvent.FETCH_PAGE_SUCCESS, page}),
    redirect: uri => ({type: navigationEvent.REDIRECT, uri}),
    errorAdded: message => ({type: navigationEvent.ERROR_ADDED, message})
}

export default navigationDispatch
