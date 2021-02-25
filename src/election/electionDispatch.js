import electionEvent from "./electionEvent";

const electionDispatch = {
    fetchElectionRequest: () => ({type: electionEvent.FETCH_ELECTION_REQUEST}),
    fetchElectionSuccess: election => ({type: electionEvent.FETCH_ELECTION_SUCCESS, election}),
    deleteElectionRequest: name => ({type: electionEvent.DELETE_ELECTION_REQUEST, name}),
    modifyElectionRequest: updates => ({type: electionEvent.UPDATE_ELECTION_REQUEST, updates}),
    errorAdded: message => ({type: electionEvent.ERROR_ADDED, message})
}

export default electionDispatch
