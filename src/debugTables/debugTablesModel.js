import {lensPathWithDefault} from '../library/lens-util';

const debugTablesModel = {
    tableNames: lensPathWithDefault(['debugTables', 'tableNames'], []),
    selectedTableName: lensPathWithDefault(['debugTables', 'selectedTableName'], 'user'),
    selectedTableData: lensPathWithDefault(['debugTables', 'selectedTableData'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['debugTables', 'errors'], [])
}

export default debugTablesModel
