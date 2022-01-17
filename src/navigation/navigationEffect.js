import navigationDispatch from './navigationDispatch'
import navigationEvent from './navigationEvent'
import {put} from 'redux-saga/effects'
import {loginPagePath} from "../login/loginConstant";
import * as R from 'ramda'

const setUri = environment => function* (event) {
    const uri = event.uri
    environment.history.push(uri)
    environment.history.go()
    yield
}

const fetchPage = environment => function* (event) {
    if(!event.navigableComponents) return
    const uri = environment.history.location.pathname
    const nameMatchesUri = component => {
        return uri === `/${component.name}`
    }
    const component = R.find(nameMatchesUri)(R.values(event.navigableComponents))
    if(uri === loginPagePath && !component) return
    if(component){
        const queryString = environment.history.location.search
        const query = R.fromPairs(Array.from(new URLSearchParams(queryString).entries()))
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
