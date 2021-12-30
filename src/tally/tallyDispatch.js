import tallyEvent from "./tallyEvent";

const tallyDispatch = {
    fetchTallyRequest: electionName => ({type: tallyEvent.FETCH_TALLY_REQUEST, electionName}),
    fetchTallySuccess: tally => ({
        type: tallyEvent.FETCH_TALLY_SUCCESS,
        tally
    }),
    navigateElection: electionName => ({type: tallyEvent.NAVIGATE_ELECTION, electionName}),
    navigateDashboard: () => ({type: tallyEvent.NAVIGATE_ELECTION}),
    errorAdded: message => ({type: tallyEvent.ERROR_ADDED, message})
}

export default tallyDispatch
