import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPagePath} from "../login/loginConstant";
import dashboardDispatch from "../dashboard/dashboardDispatch";
import usersDispatch from "../users/usersDispatch";
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
import {createApi, MANAGE_USERS, VIEW_SECRETS} from "../api/api";

const dispatchMap = {
    login: loginDispatch,
    register: registerDispatch,
    dashboard: dashboardDispatch,
    users: usersDispatch,
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

const handleError = environment => function* (f) {
    yield put(navigationDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(navigationDispatch.errorAdded(ex.message))
    }
}

const parsePathnameSearch = s => {
    const indexOfQuestion = s.indexOf('?')
    if (indexOfQuestion === -1) {
        const pathname = s
        const search = ''
        return {pathname, search}
    } else {
        const pathname = s.substring(0, indexOfQuestion)
        const search = s.substring(indexOfQuestion)
        return {pathname, search}
    }
}

const setUri = environment => function* (event) {
    const uri = event.uri
    const parsed = parsePathnameSearch(uri)
    const newPathname = parsed.pathname
    const newSearch = parsed.search
    const location = environment.history.location
    const oldSearch = location.search
    const oldSearchParams = new URLSearchParams(oldSearch)
    const newSearchParams = new URLSearchParams(newSearch)
    const oldSearchArray = Array.from(oldSearchParams.entries())
    const newSearchArray = Array.from(newSearchParams.entries())
    const oldSearchMap = R.fromPairs(oldSearchArray)
    const newSearchMap = R.fromPairs(newSearchArray)
    const mergedMap = R.mergeRight(oldSearchMap, newSearchMap)
    const mergedArray = R.toPairs(mergedMap)
    const builder = new URLSearchParams()
    mergedArray.forEach(element => {
        if (element[0] !== 'accessToken') {
            builder.append(element[0], element[1])
        }
    })
    const merged = newPathname + '?' + builder.toString()
    environment.history.push(merged)
    yield
}

const clearBrowserState = environment => function* (event) {
    environment.history.push('/')
    environment.history.go()
    yield
}

const doNotNeedAnyPermissions = ['login', 'register', 'style']
const needManageUsersPermission = ['users']
const needViewSecretsPermission = ['tables', 'debugTables', 'events']

const getPermissions = loginInformation => {
    if (loginInformation == null) return []
    return loginInformation.permissions
}

const fetchPageRequest = environment => function* () {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const pathName = environment.history.location.pathname
        const pageName = pathName.substring(1)
        const dispatch = dispatchMap[pageName]
        if (dispatch) {
            const queryString = environment.history.location.search
            const urlSearchParams = new URLSearchParams(queryString)
            const query = R.fromPairs(Array.from(urlSearchParams.entries()))
            let loginInformation = null
            if (urlSearchParams.has('accessToken')) {
                const accessToken = urlSearchParams.get('accessToken')
                const loginInformation = yield api.authenticateWithToken(accessToken)
                environment.setLoginInformation(loginInformation)
                urlSearchParams.delete('accessToken')
                environment.history.push(environment.history.location.pathname + '?' + urlSearchParams.toString())
            }
            if (!R.includes(pageName, doNotNeedAnyPermissions)) {
                loginInformation = yield environment.fetchLoginInformation()
            }
            const permissions = getPermissions(loginInformation)
            yield put(navigationDispatch.fetchPageSuccess({pageName, loginInformation}))
            if (R.includes(pageName, needManageUsersPermission) && !R.includes(MANAGE_USERS, permissions)) {
                yield put(navigationDispatch.errorAdded(`You need ${MANAGE_USERS} permission to view the ${pageName} page`))
            } else if (R.includes(pageName, needViewSecretsPermission) && !R.includes(VIEW_SECRETS, permissions)) {
                yield put(navigationDispatch.errorAdded(`You need ${VIEW_SECRETS} permission to view the ${pageName} page`))
            } else {
                yield put(dispatch.initialize({query, loginInformation}))
            }
        } else if (pageName === '') {
            yield put(navigationDispatch.setUri(loginPagePath))
        } else {
            yield put(navigationDispatch.errorAdded(`Page '${pageName}' not found`))
        }
    })
}

const history = environment => function* () {
    yield put(navigationDispatch.fetchPageRequest())
}

const navigationEffect = {
    [navigationEvent.FETCH_PAGE_REQUEST]: fetchPageRequest,
    [navigationEvent.HISTORY]: history,
    [navigationEvent.SET_URI]: setUri,
    [navigationEvent.CLEAR_BROWSER_STATE]: clearBrowserState
}

export default navigationEffect
