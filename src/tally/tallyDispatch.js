import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: ({election, secretBallot, tally}) => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        election,
        tally,
        secretBallot
    }),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message})
}

export default tallyDispatch
