import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPageName, loginPagePath, loginUriPattern} from "../login/loginConstant";
import {registerPageName, registerUriPattern} from "../register/registerConstant";
import {manageUsersPageName, manageUsersUriPattern} from "../manageUsers/manageUsersConstant";
import {dashboardPageName, dashboardUriPattern} from "../dashboard/dashboardConstant";
import dashboardDispatch from "../dashboard/dashboardDispatch";
import manageUsersDispatch from "../manageUsers/manageUsersDispatch";
import {parseTableFromUri, tablesPageName, tablesUriPattern} from "../tables/tablesConstant";
import {debugTablesPageName, debugTablesUriPattern, parseDebugTableFromUri} from "../debugTables/debugTablesConstant";
import tablesDispatch from "../tables/tablesDispatch";
import debugTablesDispatch from "../debugTables/debugTablesDispatch";
import {eventsPageName, eventsUriPattern} from "../events/eventsConstant";
import eventsDispatch from "../events/eventsDispatch";
import {electionsPageName, electionsUriPattern} from "../elections/electionsConstant";
import electionsDispatch from "../elections/electionsDispatch";
import {electionPageName, electionUriPattern} from "../election/electionConstant";
import {candidatesPageName, candidatesUriPattern} from "../candidates/candidatesConstant";
import electionDispatch from "../election/electionDispatch";
import {stylePageName, styleUriPattern} from "../style/styleConstant";
import candidatesDispatch from "../candidates/candidatesDispatch";
import {ballotPageName, ballotUriPattern} from "../ballot/ballotConstant";
import ballotDispatch from "../ballot/ballotDispatch";
import {tallyPageName, tallyUriPattern} from "../tally/tallyConstant";
import tallyDispatch from "../tally/tallyDispatch";

const redirect = environment => function* (event) {
    const uri = event.uri
    environment.history.push(uri)
    environment.history.go(0)
}

const setUri = environment => function* (event) {
    const uri = event.uri
    const encodedUri = encodeURI(uri)
    environment.history.push(encodedUri)
    yield put(navigationDispatch.fetchPageRequest())
}

const fetchPage = environment => function* () {
    const uri = environment.history.location.pathname
    const queryString = environment.history.location.search
    if (loginUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(loginPageName))
    } else if (registerUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(registerPageName))
    } else if (dashboardUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(dashboardPageName))
        yield put(dashboardDispatch.fetchCountsRequest())
    } else if (manageUsersUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(manageUsersPageName))
        yield put(manageUsersDispatch.fetchUsersRequest())
    } else if (tablesUriPattern.test(uri)) {
        const table = parseTableFromUri(queryString)
        yield put(navigationDispatch.fetchPageSuccess(tablesPageName))
        yield put(tablesDispatch.fetchTableNamesRequest())
        yield put(tablesDispatch.selectedTableChanged(table))
    } else if (debugTablesUriPattern.test(uri)) {
        const table = parseDebugTableFromUri(queryString)
        yield put(navigationDispatch.fetchPageSuccess(debugTablesPageName))
        yield put(debugTablesDispatch.fetchTableNamesRequest())
        yield put(debugTablesDispatch.selectedTableChanged(table))
    } else if (eventsUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(eventsPageName))
        yield put(eventsDispatch.fetchTableRequest())
    } else if (electionsUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(electionsPageName))
        yield put(electionsDispatch.fetchElectionsRequest())
    } else if (electionUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(electionPageName))
        yield put(electionDispatch.fetchElectionRequest())
    } else if (candidatesUriPattern.test(uri)) {
        const queryString = environment.history.location.search
        const params = new URLSearchParams(queryString)
        const electionName = params.get('election')
        yield put(navigationDispatch.fetchPageSuccess(candidatesPageName))
        yield put(candidatesDispatch.fetchCandidatesRequest(electionName))
    } else if (styleUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(stylePageName))
    } else if (ballotUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(ballotPageName))
        const queryString = environment.history.location.search
        const params = new URLSearchParams(queryString)
        const voterName = params.get('voter')
        const electionName = params.get('election')
        yield put(ballotDispatch.fetchBallotRequest({voterName, electionName}))
    } else if (tallyUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(tallyPageName))
        const queryString = environment.history.location.search
        const params = new URLSearchParams(queryString)
        const electionName = params.get('election')
        yield put(tallyDispatch.fetchTallyRequest(electionName))
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
