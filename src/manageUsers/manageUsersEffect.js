import manageUsersDispatch from './manageUsersDispatch'
import manageUsersEvent from './manageUsersEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";
import environment from "../environment/environment";

const handleError = environment => function* (f) {
    yield put(manageUsersDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(manageUsersDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event){
    yield put(manageUsersDispatch.fetchUsersRequest())
}

const fetchUsersRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const users = yield api.listUsers()
        yield put(manageUsersDispatch.usersChanged(users))
    })
}

const updateUserRoleRequest = environment => function* (event) {
    const api = createApi(environment)
    const {userName, role} = event
    yield* handleError(environment)(function* () {
        yield api.setRole({userName, role})
        yield put(manageUsersDispatch.fetchUsersRequest())
    })
}

const manageUsersEffect = {
    [manageUsersEvent.INITIALIZE]: initialize,
    [manageUsersEvent.FETCH_USERS_REQUEST]: fetchUsersRequest,
    [manageUsersEvent.UPDATE_USER_ROLE_REQUEST]: updateUserRoleRequest
}

export default manageUsersEffect
