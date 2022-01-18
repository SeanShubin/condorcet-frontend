import usersDispatch from './usersDispatch'
import usersEvent from './usersEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(usersDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(usersDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event){
    yield put(usersDispatch.fetchUsersRequest())
}

const fetchUsersRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const users = yield api.listUsers()
        yield put(usersDispatch.usersChanged(users))
    })
}

const updateUserRoleRequest = environment => function* (event) {
    const api = createApi(environment)
    const {userName, role} = event
    yield* handleError(environment)(function* () {
        yield api.setRole({userName, role})
        yield put(usersDispatch.fetchUsersRequest())
    })
}

const usersEffect = {
    [usersEvent.INITIALIZE]: initialize,
    [usersEvent.FETCH_USERS_REQUEST]: fetchUsersRequest,
    [usersEvent.UPDATE_USER_ROLE_REQUEST]: updateUserRoleRequest
}

export default usersEffect
