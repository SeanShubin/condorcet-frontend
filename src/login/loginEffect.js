import loginDispatch from './loginDispatch'
import loginEvent from './loginEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(loginDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(loginDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    yield
}

const loginRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const {nameOrEmail, password} = event
        yield api.authenticate({nameOrEmail, password})
        yield put(navigationDispatch.setUri(dashboardPagePath))
    })
}

const loginEffect = {
    [loginEvent.INITIALIZE]: initialize,
    [loginEvent.LOGIN_REQUEST]: loginRequest
}

export default loginEffect
