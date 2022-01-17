import tablesEvent from "./tablesEvent";

const tablesDispatch = {
    initialize: query => ({type:tablesEvent.INITIALIZE, query}),
    fetchTableNamesRequest: () => ({type: tablesEvent.FETCH_TABLE_NAMES_REQUEST}),
    fetchTableNamesSuccess: tableNames => ({type: tablesEvent.FETCH_TABLE_NAMES_SUCCESS, tableNames}),
    fetchTableRequest: tableName => ({type: tablesEvent.FETCH_TABLE_REQUEST, tableName}),
    fetchTableSuccess: tableData => ({type: tablesEvent.FETCH_TABLE_SUCCESS, tableData}),
    selectedTableChanged: selectedTableName => ({type: tablesEvent.SELECTED_TABLE_CHANGED, selectedTableName}),
    errorAdded: message => ({type: tablesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: tablesEvent.CLEAR_ERRORS})
}

export default tablesDispatch
