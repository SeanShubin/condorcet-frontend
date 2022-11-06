import userDispatch from './userDispatch'
import userEvent from './userEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {createApi} from "../api/api";
import * as R from "ramda";

const handleError = environment => function* (f){
    yield put(userDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(userDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    yield* handleError(environment)(function*() {
        const query = event.query
        const name = query.user
        yield put(userDispatch.fetchUserRequest(name))
    })
}

const fetchUserRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const userName = event.name
        const {name, email} = yield api.getUser(userName)
        yield put(userDispatch.fetchUserSuccess({name, email}))
    })
}

const composeUpdateUserArgs = ({name, updates}) => {
    const userName = name
    const newUserName = updates.name
    const newEmail = updates.email
    const startingObject = {
        userName
    }
    let userNameUpdate
    if(newUserName) {
        userNameUpdate = { newUserName }
    } else {
        userNameUpdate = {}
    }

    let emailUpdate
    if(newEmail) {
        emailUpdate = { newEmail }
    } else {
        emailUpdate = {}
    }

    return R.mergeAll([startingObject, userNameUpdate, emailUpdate])
}

const updateUserRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const {name, updates} = event
        const updateUserArgs = composeUpdateUserArgs({name, updates})
        yield api.updateUser(updateUserArgs)
        yield put(navigationDispatch.setUri(dashboardPagePath))
    })
}

const userEffect = {
    [userEvent.INITIALIZE]: initialize,
    [userEvent.UPDATE_USER_REQUEST]: updateUserRequest,
    [userEvent.FETCH_USER_REQUEST]:fetchUserRequest
}

export default userEffect
