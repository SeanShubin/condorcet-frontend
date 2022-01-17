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
    environment.history.go()
}

const fetchPage = environment => function* (event) {
    const uri = environment.history.location.pathname
    const queryString = environment.history.location.search
    const nameMatchesUri = component => {
        return uri === `/${component.name}`
    }
    const component = R.find(nameMatchesUri)(R.values(event.navigableComponents))
    const query = R.fromPairs(Array.from(new URLSearchParams(queryString).entries()))

    if (loginUriPattern.test(uri)) {
        let loginInformation
        if(component.requiresLogin){
            loginInformation = yield environment.getLoginInformation()
        } else {
            loginInformation = null
        }
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        if(component.dispatch.initialize){
            yield put(component.dispatch.initialize(query))
        }
    } else if (registerUriPattern.test(uri)) {
        let loginInformation
        if(component.requiresLogin){
            loginInformation = yield environment.getLoginInformation()
        } else {
            loginInformation = null
        }
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        if(component.dispatch.initialize){
            yield put(component.dispatch.initialize(query))
        }
    } else if (dashboardUriPattern.test(uri)) {
        let loginInformation
        if(component.requiresLogin){
            loginInformation = yield environment.getLoginInformation()
        } else {
            loginInformation = null
        }
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        if(component.dispatch.initialize){
            yield put(component.dispatch.initialize(query))
        }
    } else if (manageUsersUriPattern.test(uri)) {
        let loginInformation
        if(component.requiresLogin){
            loginInformation = yield environment.getLoginInformation()
        } else {
            loginInformation = null
        }
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        if(component.dispatch.initialize){
            yield put(component.dispatch.initialize(query))
        }
    } else if (tablesUriPattern.test(uri)) {
        const table = parseTableFromUri(queryString)
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        yield put(tablesDispatch.fetchTableNamesRequest())
        yield put(tablesDispatch.selectedTableChanged(table))
    } else if (debugTablesUriPattern.test(uri)) {
        const table = parseDebugTableFromUri(queryString)
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        yield put(debugTablesDispatch.fetchTableNamesRequest())
        yield put(debugTablesDispatch.selectedTableChanged(table))
    } else if (eventsUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        yield put(eventsDispatch.fetchTableRequest())
    } else if (electionsUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        yield put(electionsDispatch.fetchElectionsRequest())
    } else if (electionUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        const fetchElectionRequestArgs = parseFromElectionUri(queryString)
        yield put(electionDispatch.fetchElectionRequest(fetchElectionRequestArgs))
    } else if (candidatesUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        const fetchCandidatesRequestArgs = parseFromCandidatesUri(queryString)
        yield put(candidatesDispatch.fetchCandidatesRequest(fetchCandidatesRequestArgs))
    } else if (styleUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
    } else if (ballotUriPattern.test(uri)) {
        let loginInformation
        if(component.requiresLogin){
            loginInformation = yield environment.getLoginInformation()
        } else {
            loginInformation = null
        }
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        if(component.dispatch.initialize){
            yield put(component.dispatch.initialize(query))
        }
    } else if (tallyUriPattern.test(uri)) {
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
        const fetchTallyRequestArgs = parseFromTallyUri(queryString)
        yield put(tallyDispatch.fetchTallyRequest(fetchTallyRequestArgs))
    } else if(votersUriPattern.test(uri)){
        const loginInformation = yield environment.getLoginInformation()
        yield put(navigationDispatch.fetchPageSuccess({
            pageName:component.name,
            loginInformation}))
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
