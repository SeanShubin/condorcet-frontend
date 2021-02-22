import eventsEvent from "./eventsEvent";

const eventsDispatch = {
    fetchTableRequest: name => ({type: eventsEvent.FETCH_TABLE_REQUEST, name}),
    fetchTableSuccess: table => ({type: eventsEvent.FETCH_TABLE_SUCCESS, table}),
    errorAdded: message => ({type: eventsEvent.ERROR_ADDED, message})
}

export default eventsDispatch
