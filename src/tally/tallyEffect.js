import tallyDispatch from './tallyDispatch'
import tallyEvent from './tallyEvent'
import {put} from 'redux-saga/effects'

const fetchTallyRequest = environment => function* (event) {
    const electionName = event.electionName
    const electionResult = yield environment.authenticatedFetch(
        `/proxy/GetElection`,
        {
            method: 'POST',
            body: JSON.stringify({name:electionName})
        })
    const electionResultJson = yield electionResult.json()
    const secretBallot = electionResultJson.secretBallot
    const tallyResult = yield environment.authenticatedFetch(
        `/proxy/Tally`,
        {
            method: 'POST',
            body: JSON.stringify({electionName:electionName})
        })
    if (tallyResult.ok) {
        const tally = yield tallyResult.json()
        yield put(tallyDispatch.fetchTallySuccess({tally, secretBallot, election: electionName}))
    } else {
        const jsonResult = yield tallyResult.json()
        yield put(tallyDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const tallyEffect = {
    [tallyEvent.FETCH_TALLY_REQUEST]: fetchTallyRequest
}

export default tallyEffect
