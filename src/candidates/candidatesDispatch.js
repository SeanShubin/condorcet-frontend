import candidatesEvent from "./candidatesEvent";

const candidatesDispatch = {
    fetchCandidatesRequest: electionName => ({type: candidatesEvent.FETCH_CANDIDATES_REQUEST, electionName}),
    fetchCandidatesSuccess: candidates => ({type: candidatesEvent.FETCH_CANDIDATES_SUCCESS, candidates}),
    updateCandidateEdits: candidates => ({type: candidatesEvent.UPDATE_CANDIDATE_EDITS, candidates}),
    setCandidatesRequest: (election, candidates) => ({
        type: candidatesEvent.SET_CANDIDATES_REQUEST,
        election,
        candidates
    }),
    setElectionName: electionName => ({type: candidatesEvent.SET_ELECTION_NAME, electionName}),
    errorAdded: message => ({type: candidatesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: candidatesEvent.CLEAR_ERRORS})
}

export default candidatesDispatch
