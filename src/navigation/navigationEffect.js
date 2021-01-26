import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPageName, loginPagePath, loginUriPattern} from "../login/loginConstant";
import {registerPageName, registerUriPattern} from "../register/registerConstant";
import {dashboardPageName, dashboardUriPattern} from "../dashboard/dashboardConstant";
import {composeErrorEventMessage} from "../library/error-util";

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
    } else {
        yield put(navigationDispatch.redirect(loginPagePath))
    }
}

const genericError = environment => function* (error, event) {
    yield put(navigationDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const navigationEffect = {
    [navigationEvent.FETCH_PAGE_REQUEST]: fetchPage,
    [navigationEvent.REDIRECT]: redirect,
    [navigationEvent.GENERIC_ERROR]: genericError
}

export default navigationEffect
