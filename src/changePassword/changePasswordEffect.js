import changePasswordDispatch from './changePasswordDispatch'
import changePasswordEvent from './changePasswordEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(changePasswordDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(changePasswordDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    yield
}

const changePasswordRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const {userName} = yield environment.fetchLoginInformation()
        const {password} = event
        yield api.changePassword({userName, password})
        yield put(navigationDispatch.setUri(dashboardPagePath))
    })
}

const changePasswordEffect = {
    [changePasswordEvent.INITIALIZE]: initialize,
    [changePasswordEvent.CHANGE_PASSWORD_REQUEST]: changePasswordRequest
}

export default changePasswordEffect
