import votersEvent from "./votersEvent";

const votersDispatch = {
    setElectionName: electionName => ({type: votersEvent.SET_ELECTION_NAME, electionName}),
    fetchVotersRequest: electionName => ({type: votersEvent.FETCH_VOTERS_REQUEST, electionName}),
    fetchVotersSuccess: voters => ({type: votersEvent.FETCH_VOTERS_SUCCESS, voters}),
    filterChanged: filter => ({type:votersEvent.FILTER_CHANGED, filter}),
    updateVoterEdits: voters => ({type: votersEvent.UPDATE_VOTER_EDITS, voters}),
    setVotersRequest: ({election, voters}) => ({
        type: votersEvent.SET_VOTERS_REQUEST,
        election,
        voters
    }),
    errorAdded: message => ({type: votersEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: votersEvent.CLEAR_ERRORS})
}

export default votersDispatch
