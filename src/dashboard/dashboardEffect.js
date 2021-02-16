import dashboardDispatch from './dashboardDispatch'
import dashboardEvent from './dashboardEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {loginPagePath} from "../login/loginConstant";
import loginDispatch from "../login/loginDispatch";

const logoutRequest = environment => function* (event) {
    environment.setAccessToken(undefined)
    const result = yield environment.fetch(`/proxy/Logout`)
    if (result.ok) {
        yield put(navigationDispatch.redirect(loginPagePath))
    } else {
        const jsonResult = yield result.json()
        yield put(loginDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const genericError = _ => function* (error, event) {
    yield put(dashboardDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const dashboardEffect = {
    [dashboardEvent.LOGOUT_REQUEST]: logoutRequest,
    [dashboardEvent.GENERIC_ERROR]: genericError
}

export default dashboardEffect
