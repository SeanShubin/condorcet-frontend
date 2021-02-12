import adminDispatch from './adminDispatch'
import adminEvent from './adminEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

const fetchUsersRequest = environment => function* (event) {
    const result = yield environment.authenticatedFetch(`/proxy/ListUsers`)
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(adminDispatch.usersChanged(jsonResult.users))
    } else {
        yield put(adminDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const updateUserRoleRequest = environment => function* (event) {
    const body = {
        user: event.user,
        role: event.role
    }
    const result = yield environment.authenticatedFetch(
        `/proxy/SetRole`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(adminDispatch.fetchUsersRequest())
    } else {
        yield put(adminDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const genericError = _ => function* (error, event) {
    yield put(adminDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const adminEffect = {
    [adminEvent.FETCH_USERS_REQUEST]: fetchUsersRequest,
    [adminEvent.UPDATE_USER_ROLE_REQUEST]: updateUserRoleRequest,
    [adminEvent.GENERIC_ERROR]: genericError
}

export default adminEffect
