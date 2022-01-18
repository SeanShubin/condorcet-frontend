import debugTablesEvent from "./debugTablesEvent";

const debugTablesDispatch = {
    initialize: query => ({type: debugTablesEvent.INITIALIZE, query}),
    setTableData: ({tableNames, selectedTableName, selectedTableData}) => ({type: debugTablesEvent.SET_TABLE_DATA, tableNames, selectedTableName, selectedTableData}),
    errorAdded: message => ({type: debugTablesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:debugTablesEvent.CLEAR_ERRORS})
}

export default debugTablesDispatch
