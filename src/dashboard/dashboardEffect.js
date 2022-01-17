import dashboardDispatch from './dashboardDispatch'
import dashboardEvent from './dashboardEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {loginPagePath} from "../login/loginConstant";
import {createApi} from "../api/api";
import environment from "../environment/environment";

const handleError = environment => function* (f) {
    yield put(dashboardDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(dashboardDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function*(event){
    yield put(dashboardDispatch.fetchCountsRequest())
}

const logoutRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        environment.clearAccessToken()
        yield api.logout()
        yield put(navigationDispatch.redirect(loginPagePath))
    })
}

const fetchCountsRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const userCount = yield api.userCount()
        const electionCount = yield api.electionCount()
        const tableCount = yield api.tableCount()
        const eventCount = yield api.eventCount()
        const allCounts = {
            userCount,
            electionCount,
            tableCount,
            eventCount
        }
        yield put(dashboardDispatch.fetchCountsSuccess(allCounts))
    })
}

const dashboardEffect = {
    [dashboardEvent.INITIALIZE]: initialize,
    [dashboardEvent.LOGOUT_REQUEST]: logoutRequest,
    [dashboardEvent.FETCH_COUNTS_REQUEST]: fetchCountsRequest
}

export default dashboardEffect
