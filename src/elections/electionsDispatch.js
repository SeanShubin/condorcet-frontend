import electionsEvent from "./electionsEvent";

const electionsDispatch = {
    fetchElectionsRequest: () => ({type: electionsEvent.FETCH_ELECTIONS_REQUEST}),
    fetchElectionsSuccess: elections => ({type: electionsEvent.FETCH_ELECTIONS_SUCCESS, elections}),
    addElectionRequest: name => ({type: electionsEvent.ADD_ELECTION_REQUEST, name}),
    electionNameChanged: name => ({type: electionsEvent.ELECTION_NAME_CHANGED, name}),
    errorAdded: message => ({type: electionsEvent.ERROR_ADDED, message})
}

export default electionsDispatch
