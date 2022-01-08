import tallyDispatch from './tallyDispatch'
import tallyEvent from './tallyEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";

const fetchTallyRequest = environment => function* (event) {
    const electionName = event.electionName
    const body = {electionName}
    const result = yield environment.authenticatedFetch(
        `/proxy/Tally`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        const tally = yield result.json()
        yield put(tallyDispatch.fetchTallySuccess({tally, election: electionName}))
    } else {
        const jsonResult = yield result.json()
        yield put(tallyDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const tallyEffect = {
    [tallyEvent.FETCH_TALLY_REQUEST]: fetchTallyRequest
}

export default tallyEffect
