import electionEvent from "./electionEvent";

const electionDispatch = {
    fetchElectionRequest: () => ({type: electionEvent.FETCH_ELECTION_REQUEST}),
    fetchElectionSuccess: ({election, canUpdate}) => ({
        type: electionEvent.FETCH_ELECTION_SUCCESS,
        election,
        canUpdate
    }),
    deleteElectionRequest: name => ({type: electionEvent.DELETE_ELECTION_REQUEST, name}),
    updateElectionRequest: updates => ({type: electionEvent.UPDATE_ELECTION_REQUEST, updates}),
    updateElectionEdits: election => ({type: electionEvent.UPDATE_ELECTION_EDITS, election}),
    errorAdded: message => ({type: electionEvent.ERROR_ADDED, message})
}

export default electionDispatch
