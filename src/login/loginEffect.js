import loginDispatch from './loginDispatch'
import loginEvent from './loginEvent'
import {put} from 'redux-saga/effects'
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

const loginEffect = {
    [loginEvent.LOGIN_REQUEST]: loginRequest
}

export default loginEffect
