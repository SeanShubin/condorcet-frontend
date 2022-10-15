import resetPasswordDispatch from './resetPasswordDispatch'
import resetPasswordEvent from './resetPasswordEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(resetPasswordDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(resetPasswordDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    yield
}

const resetPasswordRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const {email} = event
        const baseUri = environment.location.origin
        yield api.resetPassword({email, baseUri})
        yield put(resetPasswordDispatch.setMessage(`Reset password link sent to ${email}`))
    })
}

const resetPasswordEffect = {
    [resetPasswordEvent.INITIALIZE]: initialize,
    [resetPasswordEvent.RESET_PASSWORD_REQUEST]: resetPasswordRequest
}

export default resetPasswordEffect
