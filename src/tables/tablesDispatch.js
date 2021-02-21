import tablesEvent from "./tablesEvent";

const tablesDispatch = {
    fetchTableNamesRequest: () => ({type: tablesEvent.FETCH_TABLE_NAMES_REQUEST}),
    fetchTableNamesSuccess: names => ({type: tablesEvent.FETCH_TABLE_NAMES_SUCCESS, names}),
    fetchTableRequest: name => ({type: tablesEvent.FETCH_TABLE_REQUEST, name}),
    fetchTableSuccess: table => ({type: tablesEvent.FETCH_TABLE_SUCCESS, table}),
    selectedTableChanged: selectedName => ({type: tablesEvent.SELECTED_TABLE_CHANGED, selectedName}),
    navigate: destination => ({type: tablesEvent.NAVIGATE, destination}),
    errorAdded: message => ({type: tablesEvent.ERROR_ADDED, message})
}

export default tablesDispatch
