import tablesDispatch from './tablesDispatch'
import tablesEvent from './tablesEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

const genericError = _ => function* (error, event) {
    yield put(tablesDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const tablesEffect = {
    [tablesEvent.GENERIC_ERROR]: genericError
}

export default tablesEffect
