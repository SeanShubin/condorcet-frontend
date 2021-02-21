import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPageName, loginPagePath, loginUriPattern} from "../login/loginConstant";
import {registerPageName, registerUriPattern} from "../register/registerConstant";
import {manageUsersPageName, manageUsersUriPattern} from "../manageUsers/manageUsersConstant";
import {dashboardPageName, dashboardUriPattern} from "../dashboard/dashboardConstant";
import {composeErrorEventMessage} from "../library/error-util";
import manageUsersDispatch from "../manageUsers/manageUsersDispatch";
import {tablesPageName, tablesUriPattern} from "../tables/tablesConstant";
import tablesDispatch from "../tables/tablesDispatch";
import {eventsPageName, eventsUriPattern} from "../events/eventsConstant";
import eventsDispatch from "../events/eventsDispatch";

const redirect = environment => function* (event) {
    const uri = event.uri
    environment.history.push(uri)
    environment.history.go(0)
}

const fetchPage = environment => function* () {
    const uri = environment.history.location.pathname
    if (loginUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(loginPageName))
    } else if (registerUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(registerPageName))
    } else if (dashboardUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(dashboardPageName))
    } else if (manageUsersUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(manageUsersPageName))
        yield put(manageUsersDispatch.fetchUsersRequest())
    } else if (tablesUriPattern.test(uri)) {
        const queryString = environment.history.location.search
        const params = new URLSearchParams(queryString)
        const table = params.get('table') || 'user'
        yield put(navigationDispatch.fetchPageSuccess(tablesPageName))
        yield put(tablesDispatch.fetchTableNamesRequest())
        yield put(tablesDispatch.selectedTableChanged(table))
    } else if (eventsUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(eventsPageName))
        yield put(eventsDispatch.fetchTableRequest())
    } else {
        yield put(navigationDispatch.redirect(loginPagePath))
    }
}

const history = environment => function* () {
    yield put(navigationDispatch.fetchPageRequest())
}

const genericError = _ => function* (error, event) {
    yield put(navigationDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const navigationEffect = {
    [navigationEvent.FETCH_PAGE_REQUEST]: fetchPage,
    [navigationEvent.HISTORY]: history,
    [navigationEvent.REDIRECT]: redirect,
    [navigationEvent.GENERIC_ERROR]: genericError
}

export default navigationEffect
