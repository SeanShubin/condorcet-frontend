import debugTablesEvent from "./debugTablesEvent";

const debugTablesDispatch = {
    fetchTableNamesRequest: () => ({type: debugTablesEvent.FETCH_TABLE_NAMES_REQUEST}),
    fetchTableNamesSuccess: names => ({type: debugTablesEvent.FETCH_TABLE_NAMES_SUCCESS, names}),
    fetchTableRequest: name => ({type: debugTablesEvent.FETCH_TABLE_REQUEST, name}),
    fetchTableSuccess: table => ({type: debugTablesEvent.FETCH_TABLE_SUCCESS, table}),
    selectedTableChanged: selectedName => ({type: debugTablesEvent.SELECTED_TABLE_CHANGED, selectedName}),
    errorAdded: message => ({type: debugTablesEvent.ERROR_ADDED, message})
}

export default debugTablesDispatch
