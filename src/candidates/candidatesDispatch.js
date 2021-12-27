import candidatesEvent from "./candidatesEvent";

const candidatesDispatch = {
    fetchCandidatesRequest: electionName => ({type: candidatesEvent.FETCH_CANDIDATES_REQUEST, electionName}),
    changeCandidates: candidates => ({type: candidatesEvent.CHANGE_CANDIDATES, candidates}),
    updateCandidatesRequest: (election, candidates) => ({
        type: candidatesEvent.UPDATE_CANDIDATES_REQUEST,
        election,
        candidates
    }),
    setElectionName: electionName => ({type: candidatesEvent.SET_ELECTION_NAME, electionName}),
    errorAdded: message => ({type: candidatesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: candidatesEvent.CLEAR_ERRORS})
}

export default candidatesDispatch
