import tablesEvent from "./tablesEvent";

const tablesDispatch = {
    initialize: ({query, loginInformation}) => ({type:tablesEvent.INITIALIZE, query, loginInformation}),
    setTableData: ({tableNames, selectedTableName, selectedTableData}) => ({type: tablesEvent.SET_TABLE_DATA, tableNames, selectedTableName, selectedTableData}),
    errorAdded: message => ({type: tablesEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: tablesEvent.CLEAR_ERRORS})
}

export default tablesDispatch
