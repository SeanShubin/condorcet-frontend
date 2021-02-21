import loginDispatch from './loginDispatch'
import loginEvent from './loginEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const loginRequest = environment => function* (event) {
    yield put(loginDispatch.clearErrors())
    const {nameOrEmail, password} = event
    const result = yield environment.fetch(
        `/proxy/Authenticate`,
        {
            method: 'POST',
            body: JSON.stringify({nameOrEmail, password})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(navigationDispatch.redirect(dashboardPagePath))
    } else {
        yield put(loginDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const navigate = environment => function* (event) {
    environment.history.push(event.destination)
    yield put(navigationDispatch.fetchPageRequest())
}

const genericError = environment => function* (error, event) {
    yield put(loginDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const loginEffect = {
    [loginEvent.LOGIN_REQUEST]: loginRequest,
    [loginEvent.NAVIGATE]: navigate,
    [loginEvent.GENERIC_ERROR]: genericError
}

export default loginEffect
