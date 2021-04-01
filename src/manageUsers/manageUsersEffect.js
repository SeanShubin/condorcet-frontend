import manageUsersDispatch from './manageUsersDispatch'
import manageUsersEvent from './manageUsersEvent'
import {put} from 'redux-saga/effects'

const fetchUsersRequest = environment => function* (event) {
    const result = yield environment.authenticatedFetch(`/proxy/ListUsers`)
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(manageUsersDispatch.usersChanged(jsonResult.users))
    } else {
        yield put(manageUsersDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const updateUserRoleRequest = environment => function* (event) {
    const body = {
        name: event.name,
        role: event.role
    }
    const result = yield environment.authenticatedFetch(
        `/proxy/SetRole`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
    if (result.ok) {
        yield put(manageUsersDispatch.fetchUsersRequest())
    } else {
        const jsonResult = yield result.json()
        yield put(manageUsersDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const manageUsersEffect = {
    [manageUsersEvent.FETCH_USERS_REQUEST]: fetchUsersRequest,
    [manageUsersEvent.UPDATE_USER_ROLE_REQUEST]: updateUserRoleRequest
}

export default manageUsersEffect
