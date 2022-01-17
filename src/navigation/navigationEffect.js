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
import * as R from 'ramda'

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

const fetchPage = environment => function* (event) {
    const userName = yield environment.getUserName()
    const role = yield environment.getRole()
    const permissions = yield environment.getPermissions()
    const uri = environment.history.location.pathname
    const queryString = environment.history.location.search
    const nameMatchesUri = component => {
        return uri === `/${component.name}`
    }
    const component = R.find(nameMatchesUri)(R.values(event.navigableComponents))
    const query = R.fromPairs(Array.from(new URLSearchParams(queryString).entries()))

    const success = pageName => {
        return navigationDispatch.fetchPageSuccess({pageName, userName, role, permissions})
    }
    if (loginUriPattern.test(uri)) {
        yield put(success(loginPageName))
    } else if (registerUriPattern.test(uri)) {
        yield put(success(registerPageName))
    } else if (dashboardUriPattern.test(uri)) {
        yield put(component.dispatch.initialize(query))
        yield put(success(component.name))
    } else if (manageUsersUriPattern.test(uri)) {
        yield put(success(manageUsersPageName))
        yield put(manageUsersDispatch.fetchUsersRequest())
    } else if (tablesUriPattern.test(uri)) {
        const table = parseTableFromUri(queryString)
        yield put(success(tablesPageName))
        yield put(tablesDispatch.fetchTableNamesRequest())
        yield put(tablesDispatch.selectedTableChanged(table))
    } else if (debugTablesUriPattern.test(uri)) {
        const table = parseDebugTableFromUri(queryString)
        yield put(success(debugTablesPageName))
        yield put(debugTablesDispatch.fetchTableNamesRequest())
        yield put(debugTablesDispatch.selectedTableChanged(table))
    } else if (eventsUriPattern.test(uri)) {
        yield put(success(eventsPageName))
        yield put(eventsDispatch.fetchTableRequest())
    } else if (electionsUriPattern.test(uri)) {
        yield put(success(electionsPageName))
        yield put(electionsDispatch.fetchElectionsRequest())
    } else if (electionUriPattern.test(uri)) {
        yield put(success(electionPageName))
        const fetchElectionRequestArgs = parseFromElectionUri(queryString)
        yield put(electionDispatch.fetchElectionRequest(fetchElectionRequestArgs))
    } else if (candidatesUriPattern.test(uri)) {
        yield put(success(candidatesPageName))
        const fetchCandidatesRequestArgs = parseFromCandidatesUri(queryString)
        yield put(candidatesDispatch.fetchCandidatesRequest(fetchCandidatesRequestArgs))
    } else if (styleUriPattern.test(uri)) {
        yield put(success(stylePageName))
    } else if (ballotUriPattern.test(uri)) {
        yield put(component.dispatch.initialize(query))
        yield put(success(component.name))
    } else if (tallyUriPattern.test(uri)) {
        yield put(success(tallyPageName))
        const fetchTallyRequestArgs = parseFromTallyUri(queryString)
        yield put(tallyDispatch.fetchTallyRequest(fetchTallyRequestArgs))
    } else if(votersUriPattern.test(uri)){
        yield put(success(votersPageName))
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
