import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: ({election, tally}) => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        election,
        tally
    }),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message})
}

export default tallyDispatch
