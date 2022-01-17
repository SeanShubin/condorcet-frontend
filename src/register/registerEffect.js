import registerDispatch from './registerDispatch'
import registerEvent from './registerEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(registerDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(registerDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    yield
}

const registerRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const {userName, email, password} = event
        yield api.register({userName, email, password})
        yield put(navigationDispatch.redirect(dashboardPagePath))
    })
}

const registerEffect = {
    [registerEvent.INITIALIZE]: initialize,
    [registerEvent.REGISTER_REQUEST]: registerRequest
}

export default registerEffect
