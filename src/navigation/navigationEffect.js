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

const redirect = environment => function* (event) {
    const uri = event.uri
    environment.history.push(uri)
    environment.history.go(0)
    yield
}

const setUri = environment => function* (event) {
    const uri = event.uri
    const encodedUri = encodeURI(uri)
    environment.history.push(encodedUri)
    yield put(navigationDispatch.fetchPageRequest())
}

const fetchPage = environment => function* () {
    const uri = environment.history.location.pathname
    const pageName = uri.substring(1)
    let loginInformation = null
    if(pageName !== 'login' && pageName !== 'register' && pageName !== 'style'){
        loginInformation = yield environment.fetchLoginInformation()
    }
    const queryString = environment.history.location.search
    const query = R.fromPairs(Array.from(new URLSearchParams(queryString).entries()))
    if (pageName === 'login') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(loginDispatch.initialize(query))
    } else if (pageName === 'register') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(registerDispatch.initialize(query))
    } else if (pageName === 'dashboard') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(dashboardDispatch.initialize(query))
    } else if (pageName === 'manageUsers') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(manageUsersDispatch.initialize(query))
    } else if (pageName === 'tables') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(tablesDispatch.initialize(query))
    } else if (pageName === 'debugTables') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(debugTablesDispatch.initialize(query))
    } else if (pageName === 'events') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(eventsDispatch.initialize(query))
    } else if (pageName === 'elections') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(electionsDispatch.initialize(query))
    } else if (pageName === 'election') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(electionDispatch.initialize(query))
    } else if (pageName === 'candidates') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(candidatesDispatch.initialize(query))
    } else if (pageName === 'style') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(styleDispatch.initialize(query))
    } else if (pageName === 'ballot') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(ballotDispatch.initialize(query))
    } else if (pageName === 'tally') {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(tallyDispatch.initialize(query))
    } else if(pageName === 'voters'){
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(votersDispatch.initialize(query))
    } else {
        yield put(navigationDispatch.redirect(loginPagePath))
    }
}

const history = environment => function* () {
    yield put(navigationDispatch.fetchPageRequest())
}

const navigationEffect = {
    [navigationEvent.FETCH_PAGE_REQUEST]: fetchPage,
    [navigationEvent.HISTORY]: history,
    [navigationEvent.REDIRECT]: redirect,
    [navigationEvent.SET_URI]: setUri
}

export default navigationEffect
