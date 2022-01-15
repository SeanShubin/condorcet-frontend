import ballotDispatch from './ballotDispatch'
import ballotEvent from './ballotEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(ballotDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(ballotDispatch.errorAdded(ex.message))
    }
}

const fetchBallotRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {voterName, electionName} = event
        const ballot = yield api.getBallot({voterName, electionName})
        const rankings = yield api.listRankings({voterName, electionName})
        yield put(ballotDispatch.fetchBallotSuccess({voterName, electionName, ballot, rankings}))
    })
}

const castBallotRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {voterName, electionName, rankings} = event
        yield api.castBallot({voterName, electionName, rankings})
        yield put(ballotDispatch.fetchBallotRequest({voterName, electionName}))
    })
}

const ballotEffect = {
    [ballotEvent.FETCH_BALLOT_REQUEST]: fetchBallotRequest,
    [ballotEvent.CAST_BALLOT_REQUEST]: castBallotRequest
}

export default ballotEffect
