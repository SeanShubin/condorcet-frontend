import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPagePath, loginUriPattern} from "../login/loginConstant";
import {registerUriPattern} from "../register/registerConstant";
import {manageUsersUriPattern} from "../manageUsers/manageUsersConstant";
import {dashboardUriPattern} from "../dashboard/dashboardConstant";
import dashboardDispatch from "../dashboard/dashboardDispatch";
import manageUsersDispatch from "../manageUsers/manageUsersDispatch";
import {parseTableFromUri, tablesUriPattern} from "../tables/tablesConstant";
import {debugTablesUriPattern, parseDebugTableFromUri} from "../debugTables/debugTablesConstant";
import tablesDispatch from "../tables/tablesDispatch";
import debugTablesDispatch from "../debugTables/debugTablesDispatch";
import {eventsUriPattern} from "../events/eventsConstant";
import eventsDispatch from "../events/eventsDispatch";
import {electionsUriPattern} from "../elections/electionsConstant";
import electionsDispatch from "../elections/electionsDispatch";
import {electionUriPattern, parseFromElectionUri} from "../election/electionConstant";
import {candidatesUriPattern, parseFromCandidatesUri} from "../candidates/candidatesConstant";
import electionDispatch from "../election/electionDispatch";
import {styleUriPattern} from "../style/styleConstant";
import candidatesDispatch from "../candidates/candidatesDispatch";
import {ballotUriPattern, parseFromBallotUri} from "../ballot/ballotConstant";
import ballotDispatch from "../ballot/ballotDispatch";
import {tallyUriPattern, parseFromTallyUri} from "../tally/tallyConstant";
import tallyDispatch from "../tally/tallyDispatch";
import {parseFromVotersUri, votersUriPattern} from "../voters/votersConstant";
import votersDispatch from "../voters/votersDispatch";

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
    if(pageName !== 'login' && pageName !== 'register'){
        loginInformation = yield environment.fetchLoginInformation()
    }
    const queryString = environment.history.location.search
    if (loginUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
    } else if (registerUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
    } else if (dashboardUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(dashboardDispatch.fetchCountsRequest())
    } else if (manageUsersUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(manageUsersDispatch.fetchUsersRequest())
    } else if (tablesUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const table = parseTableFromUri(queryString)
        yield put(tablesDispatch.fetchTableNamesRequest())
        yield put(tablesDispatch.selectedTableChanged(table))
    } else if (debugTablesUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const table = parseDebugTableFromUri(queryString)
        yield put(debugTablesDispatch.fetchTableNamesRequest())
        yield put(debugTablesDispatch.selectedTableChanged(table))
    } else if (eventsUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(eventsDispatch.fetchTableRequest())
    } else if (electionsUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        yield put(electionsDispatch.fetchElectionsRequest())
    } else if (electionUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const fetchElectionRequestArgs = parseFromElectionUri(queryString)
        yield put(electionDispatch.fetchElectionRequest(fetchElectionRequestArgs))
    } else if (candidatesUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const fetchCandidatesRequestArgs = parseFromCandidatesUri(queryString)
        yield put(candidatesDispatch.fetchCandidatesRequest(fetchCandidatesRequestArgs))
    } else if (styleUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
    } else if (ballotUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const fetchBallotRequestArgs = parseFromBallotUri(queryString)
        yield put(ballotDispatch.fetchBallotRequest(fetchBallotRequestArgs))
    } else if (tallyUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const fetchTallyRequestArgs = parseFromTallyUri(queryString)
        yield put(tallyDispatch.fetchTallyRequest(fetchTallyRequestArgs))
    } else if(votersUriPattern.test(uri)){
        yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
        const fetchVotersRequestArgs = parseFromVotersUri(queryString)
        yield put(votersDispatch.fetchVotersRequest(fetchVotersRequestArgs))
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
