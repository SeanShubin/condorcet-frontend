import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    initialize: ({query, loginInformation}) => ({type: tallyEvent.INITIALIZE, query, loginInformation}),
    setElectionName: electionName => ({type:tallyEvent.SET_ELECTION_NAME, electionName}),
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: tally => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        tally
    }),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: tallyEvent.CLEAR_ERRORS})
}

export default tallyDispatch
