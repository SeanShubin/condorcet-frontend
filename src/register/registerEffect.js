import registerDispatch from './registerDispatch'
import registerEvent from './registerEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const registerRequest = environment => function* (event) {
    const {name, email, password} = event
    const result = yield environment.fetch(
        `/proxy/AddUser`,
        {
            method: 'POST',
            body: JSON.stringify({name, email, password})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        environment.sessionStorage.setItem('name', jsonResult.name)
        environment.sessionStorage.setItem('password', password)
        yield put(navigationDispatch.redirect(dashboardPagePath))
    } else {
        yield put(registerDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const genericError = environment => function* (error, event) {
    yield put(registerDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const registerEffect = {
    [registerEvent.REGISTER_REQUEST]: registerRequest,
    [registerEvent.GENERIC_ERROR]: genericError
}

export default registerEffect
