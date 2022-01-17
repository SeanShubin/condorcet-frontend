import votersEvent from "./votersEvent";

const votersDispatch = {
    initialize: query => ({type: votersEvent.INITIALIZE, query}),
    fetchVotersRequest: electionName => ({type: votersEvent.FETCH_VOTERS_REQUEST, electionName}),
    fetchVotersSuccess: ({voters, election, userName}) => ({type: votersEvent.FETCH_VOTERS_SUCCESS, voters, election, userName}),
    filterChanged: filter => ({type:votersEvent.FILTER_CHANGED, filter}),
    updateVoterEdits: voters => ({type: votersEvent.UPDATE_VOTER_EDITS, voters}),
    setVotersRequest: ({electionName, userNames}) => ({
        type: votersEvent.SET_VOTERS_REQUEST,
        electionName,
        userNames
    }),
    errorAdded: message => ({type: votersEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: votersEvent.CLEAR_ERRORS})
}

export default votersDispatch
