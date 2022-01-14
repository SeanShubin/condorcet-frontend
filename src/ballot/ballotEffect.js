import ballotDispatch from './ballotDispatch'
import ballotEvent from './ballotEvent'
import {put} from 'redux-saga/effects'

const fetchBallotRequest = environment => function* (event) {
    const voterName = event.voterName
    const electionName = event.electionName
    const body = {voterName, electionName}
    const result = yield environment.authenticatedFetch(
        `/proxy/ListRankings`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        const jsonResult = yield result.json()
        const rankings = jsonResult.rankings
        yield put(ballotDispatch.fetchBallotSuccess({voterName, electionName, rankings}))
    } else {
        const jsonResult = yield result.json()
        yield put(ballotDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const castBallotRequest = environment => function* (event) {
    const voterName = event.voterName
    const electionName = event.electionName
    const rankings = event.rankings
    const body = {voterName, electionName, rankings}
    const result = yield environment.authenticatedFetch(
        `/proxy/CastBallot`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        yield put(ballotDispatch.fetchBallotRequest({voterName, electionName}))
    } else {
        const jsonResult = yield result.json()
        yield put(ballotDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const ballotEffect = {
    [ballotEvent.FETCH_BALLOT_REQUEST]: fetchBallotRequest,
    [ballotEvent.CAST_BALLOT_REQUEST]: castBallotRequest
}

export default ballotEffect
