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
import {electionPageName, electionUriPattern, parseFromElectionUri} from "../election/electionConstant";
import {candidatesPageName, candidatesUriPattern, parseFromCandidatesUri} from "../candidates/candidatesConstant";
import electionDispatch from "../election/electionDispatch";
import {stylePageName, styleUriPattern} from "../style/styleConstant";
import candidatesDispatch from "../candidates/candidatesDispatch";
import {ballotPageName, ballotUriPattern, parseFromBallotUri} from "../ballot/ballotConstant";
import ballotDispatch from "../ballot/ballotDispatch";
import {tallyPageName, tallyUriPattern, parseFromTallyUri} from "../tally/tallyConstant";
import tallyDispatch from "../tally/tallyDispatch";
import {parseFromVotersUri, votersPageName, votersUriPattern} from "../voters/votersConstant";
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
        const fetchElectionRequestArgs = parseFromElectionUri(queryString)
        yield put(electionDispatch.fetchElectionRequest(fetchElectionRequestArgs))
    } else if (candidatesUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(candidatesPageName))
        const fetchCandidatesRequestArgs = parseFromCandidatesUri(queryString)
        yield put(candidatesDispatch.fetchCandidatesRequest(fetchCandidatesRequestArgs))
    } else if (styleUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(stylePageName))
    } else if (ballotUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(ballotPageName))
        const fetchBallotRequestArgs = parseFromBallotUri(queryString)
        yield put(ballotDispatch.fetchBallotRequest(fetchBallotRequestArgs))
    } else if (tallyUriPattern.test(uri)) {
        yield put(navigationDispatch.fetchPageSuccess(tallyPageName))
        const fetchTallyRequestArgs = parseFromTallyUri(queryString)
        yield put(tallyDispatch.fetchTallyRequest(fetchTallyRequestArgs))
    } else if(votersUriPattern.test(uri)){
        yield put(navigationDispatch.fetchPageSuccess(votersPageName))
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
