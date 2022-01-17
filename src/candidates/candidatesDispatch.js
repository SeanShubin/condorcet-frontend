import candidatesEvent from "./candidatesEvent";

const candidatesDispatch = {
    initialize: query => ({type: candidatesEvent.INITIALIZE, query}),
    fetchCandidatesRequest: electionName => ({type: candidatesEvent.FETCH_CANDIDATES_REQUEST, electionName}),
    fetchCandidatesSuccess: ({electionName, candidateNames}) => ({type: candidatesEvent.FETCH_CANDIDATES_SUCCESS, electionName, candidateNames}),
    updateCandidateEdits: candidateNames => ({type: candidatesEvent.UPDATE_CANDIDATE_EDITS, candidateNames}),
    setCandidatesRequest: (electionName, candidateNames) => ({
        type: candidatesEvent.SET_CANDIDATES_REQUEST,
        electionName,
        candidateNames
    }),
    errorAdded: message => ({type: candidatesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: candidatesEvent.CLEAR_ERRORS})
}

export default candidatesDispatch
