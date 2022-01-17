import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    initialize: query => ({type: tallyEvent.INITIALIZE, query}),
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: ({electionName, tally}) => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        electionName,
        tally
    }),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: tallyEvent.CLEAR_ERRORS})
}

export default tallyDispatch
