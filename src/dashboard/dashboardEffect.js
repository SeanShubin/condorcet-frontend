import dashboardDispatch from './dashboardDispatch'
import dashboardEvent from './dashboardEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";
import {loginPagePath} from "../login/loginConstant";
import loginDispatch from "../login/loginDispatch";
import * as R from 'ramda'

const logoutRequest = environment => function* (event) {
    environment.setAccessToken(undefined)
    const result = yield environment.fetch(`/proxy/Logout`)
    if (result.ok) {
        yield put(navigationDispatch.redirect(loginPagePath))
    } else {
        const jsonResult = yield result.json()
        yield put(loginDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const fetchCountsRequest = environment => function* (event) {
    const successfulResults = []
    const userCountResult = yield environment.authenticatedFetch(`/proxy/UserCount`)
    const userCountJsonResult = yield userCountResult.json()
    if (userCountResult.ok) {
        successfulResults.push(userCountJsonResult)
    } else {
        yield put(dashboardDispatch.errorAdded(userCountJsonResult.userSafeMessage))
    }
    const electionCountResult = yield environment.authenticatedFetch(`/proxy/ElectionCount`)
    const electionCountJsonResult = yield electionCountResult.json()
    if (electionCountResult.ok) {
        successfulResults.push(electionCountJsonResult)
    } else {
        yield put(dashboardDispatch.errorAdded(electionCountJsonResult.userSafeMessage))
    }
    const tableCountResult = yield environment.authenticatedFetch(`/proxy/TableCount`)
    const tableCountJsonResult = yield tableCountResult.json()
    if (tableCountResult.ok) {
        successfulResults.push(tableCountJsonResult)
    } else {
        yield put(dashboardDispatch.errorAdded(tableCountJsonResult.userSafeMessage))
    }
    const eventCountResult = yield environment.authenticatedFetch(`/proxy/EventCount`)
    const eventCountJsonResult = yield eventCountResult.json()
    if (eventCountResult.ok) {
        successfulResults.push(eventCountJsonResult)
    } else {
        yield put(dashboardDispatch.errorAdded(eventCountJsonResult.userSafeMessage))
    }
    const allCounts = R.mergeAll(successfulResults)
    yield put(dashboardDispatch.fetchCountsSuccess(allCounts))
}

const genericError = _ => function* (error, event) {
    yield put(dashboardDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const navigate = environment => function* (event) {
    environment.history.push(event.destination)
    yield put(navigationDispatch.fetchPageRequest())
}

const dashboardEffect = {
    [dashboardEvent.LOGOUT_REQUEST]: logoutRequest,
    [dashboardEvent.FETCH_COUNTS_REQUEST]: fetchCountsRequest,
    [dashboardEvent.NAVIGATE]: navigate,
    [dashboardEvent.GENERIC_ERROR]: genericError
}

export default dashboardEffect
