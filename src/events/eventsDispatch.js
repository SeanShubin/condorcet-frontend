import eventsEvent from "./eventsEvent";

const eventsDispatch = {
    initialize: ({query, loginInformation}) => ({type: eventsEvent.INITIALIZE, query, loginInformation}),
    fetchTableRequest: tableName => ({type: eventsEvent.FETCH_TABLE_REQUEST, tableName}),
    fetchTableSuccess: tableData => ({type: eventsEvent.FETCH_TABLE_SUCCESS, tableData}),
    errorAdded: message => ({type: eventsEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: eventsEvent.CLEAR_ERRORS})
}

export default eventsDispatch
