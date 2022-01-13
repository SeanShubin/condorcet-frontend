import votersDispatch from './votersDispatch'
import votersEvent from './votersEvent'
import {put} from 'redux-saga/effects'

const fetchVotersRequest = environment => function* (event) {
    yield put(votersDispatch.clearErrors())
    const electionName = event.electionName
    yield put(votersDispatch.setElectionName(electionName))
    const body = {electionName}
    const result = yield environment.authenticatedFetch(
        `/proxy/ListEligibility`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(votersDispatch.fetchVotersSuccess(jsonResult))
    } else {
        yield put(votersDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const setVotersRequest = environment => function* (event) {
    yield put(votersDispatch.clearErrors())
    const electionName = event.election
    const userNames = event.voters
    const body = {electionName, userNames}
    const result = yield environment.authenticatedFetch(
        `/proxy/SetEligibleVoters`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        yield put(votersDispatch.fetchVotersRequest(electionName))
    } else {
        const jsonResult = yield result.json()
        yield put(votersDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const votersEffect = {
    [votersEvent.FETCH_VOTERS_REQUEST]: fetchVotersRequest,
    [votersEvent.SET_VOTERS_REQUEST]: setVotersRequest,
}

export default votersEffect
