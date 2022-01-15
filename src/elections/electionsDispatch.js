import electionsEvent from "./electionsEvent";

const electionsDispatch = {
    fetchElectionsRequest: () => ({type: electionsEvent.FETCH_ELECTIONS_REQUEST}),
    fetchElectionsSuccess: elections => ({type: electionsEvent.FETCH_ELECTIONS_SUCCESS, elections}),
    addElectionRequest: electionName => ({type: electionsEvent.ADD_ELECTION_REQUEST, electionName}),
    electionNameChanged: electionName => ({type: electionsEvent.ELECTION_NAME_CHANGED, electionName}),
    errorAdded: message => ({type: electionsEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:electionsEvent.CLEAR_ERRORS})
}

export default electionsDispatch
