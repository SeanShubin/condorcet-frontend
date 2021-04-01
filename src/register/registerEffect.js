import registerDispatch from './registerDispatch'
import registerEvent from './registerEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const registerRequest = environment => function* (event) {
    yield put(registerDispatch.clearErrors())
    const {name, email, password} = event
    const result = yield environment.fetch(
        `/proxy/Register`,
        {
            method: 'POST',
            body: JSON.stringify({name, email, password})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(navigationDispatch.redirect(dashboardPagePath))
    } else {
        yield put(registerDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const registerEffect = {
    [registerEvent.REGISTER_REQUEST]: registerRequest
}

export default registerEffect
