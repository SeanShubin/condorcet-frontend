import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPagePath} from "../login/loginConstant";
import dashboardDispatch from "../dashboard/dashboardDispatch";
import manageUsersDispatch from "../manageUsers/manageUsersDispatch";
import tablesDispatch from "../tables/tablesDispatch";
import debugTablesDispatch from "../debugTables/debugTablesDispatch";
import eventsDispatch from "../events/eventsDispatch";
import electionsDispatch from "../elections/electionsDispatch";
import electionDispatch from "../election/electionDispatch";
import candidatesDispatch from "../candidates/candidatesDispatch";
import ballotDispatch from "../ballot/ballotDispatch";
import tallyDispatch from "../tally/tallyDispatch";
import votersDispatch from "../voters/votersDispatch";
import * as R from 'ramda'
import loginDispatch from "../login/loginDispatch";
import registerDispatch from "../register/registerDispatch";
import styleDispatch from "../style/styleDispatch";

const dispatchMap = {
    login: loginDispatch,
    register: registerDispatch,
    dashboard: dashboardDispatch,
    manageUsers: manageUsersDispatch,
    tables: tablesDispatch,
    debugTables: debugTablesDispatch,
    events: eventsDispatch,
    elections: electionsDispatch,
    election: electionDispatch,
    candidates: candidatesDispatch,
    ballot: ballotDispatch,
    tally: tallyDispatch,
    voters: votersDispatch,
    style: styleDispatch
}

const setUri = environment => function* (event) {
    const uri = event.uri
    environment.history.push(uri)
    yield put(navigationDispatch.fetchPageRequest())
}

const fetchPage = environment => function* () {
    const uri = environment.history.location.pathname
    const pageName = uri.substring(1)
    const dispatch = dispatchMap[pageName]
    if (dispatch) {
        const queryString = environment.history.location.search
        const query = R.fromPairs(Array.from(new URLSearchParams(queryString).entries()))
        let loginInformation = null
        if (pageName !== 'login' && pageName !== 'register' && pageName !== 'style') {
            loginInformation = yield environment.fetchLoginInformation()
        }
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(dispatch.initialize(query))
    } else {
        yield put(navigationDispatch.setUri(loginPagePath))
    }
}

const history = environment => function* () {
    yield put(navigationDispatch.fetchPageRequest())
}

const navigationEffect = {
    [navigationEvent.FETCH_PAGE_REQUEST]: fetchPage,
    [navigationEvent.HISTORY]: history,
    [navigationEvent.SET_URI]: setUri
}

export default navigationEffect
