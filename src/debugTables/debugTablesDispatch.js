import debugTablesEvent from "./debugTablesEvent";

const debugTablesDispatch = {
    fetchTableNamesRequest: () => ({type: debugTablesEvent.FETCH_TABLE_NAMES_REQUEST}),
    fetchTableNamesSuccess: tableNames => ({type: debugTablesEvent.FETCH_TABLE_NAMES_SUCCESS, tableNames}),
    fetchTableRequest: tableName => ({type: debugTablesEvent.FETCH_TABLE_REQUEST, tableName}),
    fetchTableSuccess: tableData => ({type: debugTablesEvent.FETCH_TABLE_SUCCESS, tableData}),
    selectedTableChanged: selectedTableName => ({type: debugTablesEvent.SELECTED_TABLE_CHANGED, selectedTableName}),
    errorAdded: message => ({type: debugTablesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:debugTablesEvent.CLEAR_ERRORS})
}

export default debugTablesDispatch
