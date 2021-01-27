import loginDispatch from './loginDispatch'
import loginEvent from './loginEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const loginRequest = environment => function* (event) {
    // just prototype it for now, will switch to HTTP authentication or JWT later.
    const {nameOrEmail, password} = event
    const result = yield environment.fetch(
        `/proxy/login-request`,
        {
            method: 'POST',
            body: JSON.stringify({nameOrEmail, password})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        environment.sessionStorage.setItem('name', jsonResult.name)
        environment.sessionStorage.setItem('password', password)
        yield put(navigationDispatch.redirect(dashboardPagePath))
    } else {
        yield put(loginDispatch.errorAdded(jsonResult.userMessage))
    }
}

const genericError = environment => function* (error, event) {
    yield put(loginDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const loginEffect = {
    [loginEvent.LOGIN_REQUEST]: loginRequest,
    [loginEvent.GENERIC_ERROR]: genericError
}

export default loginEffect
