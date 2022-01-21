import dashboardDispatch from './dashboardDispatch'
import dashboardEvent from './dashboardEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {createApi, hasPermission, MANAGE_USERS, VIEW_SECRETS} from "../api/api";

const handleError = environment => function* (f) {
    yield put(dashboardDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(dashboardDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function*(event){
    yield* handleError(environment)(function* () {
        const canViewSecrets = hasPermission(event.loginInformation)(VIEW_SECRETS)
        const canManageUsers = hasPermission(event.loginInformation)(MANAGE_USERS)
        yield put(dashboardDispatch.fetchCountsRequest({
            canViewSecrets,
            canManageUsers
        }))
    })
}

const logoutRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        environment.clearAccessToken()
        yield api.logout()
        yield put(navigationDispatch.clearBrowserState())
    })
}

const fetchCountsRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const canViewSecrets = event.canViewSecrets
        const canManageUsers = event.canManageUsers
        const electionCount = yield api.electionCount()
        let userCount
        if(canManageUsers){
            userCount = yield api.userCount()
        }
        let tableCount
        let eventCount
        if(canViewSecrets){
            tableCount = yield api.tableCount()
            eventCount = yield api.eventCount()
        }
        yield put(dashboardDispatch.fetchCountsSuccess({
            canViewSecrets,
            canManageUsers,
            userCount,
            electionCount,
            tableCount,
            eventCount
        }))
    })
}

const dashboardEffect = {
    [dashboardEvent.INITIALIZE]: initialize,
    [dashboardEvent.LOGOUT_REQUEST]: logoutRequest,
    [dashboardEvent.FETCH_COUNTS_REQUEST]: fetchCountsRequest
}

export default dashboardEffect
