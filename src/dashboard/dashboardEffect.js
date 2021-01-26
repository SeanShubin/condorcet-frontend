import dashboardDispatch from './dashboardDispatch'
import dashboardEvent from './dashboardEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {loginPagePath} from "../login/loginConstant";

const logoutRequest = environment => function* (event) {
    environment.purgeSecrets()
    yield put(navigationDispatch.redirect(loginPagePath))
}

const genericError = environment => function* (error, event) {
    yield put(dashboardDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const dashboardEffect = {
    [dashboardEvent.LOGOUT_REQUEST]: logoutRequest,
    [dashboardEvent.GENERIC_ERROR]: genericError
}

export default dashboardEffect
