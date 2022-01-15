import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: ({electionName, secretBallot, tally}) => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        electionName,
        tally,
        secretBallot
    }),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: tallyEvent.CLEAR_ERRORS})
}

export default tallyDispatch
