import {lensPathWithDefault} from '../library/lens-util';

const debugTablesModel = {
    selectedTableName: lensPathWithDefault(['debugTables', 'selectedTableName'], 'user'),
    tableNames: lensPathWithDefault(['debugTables', 'tableNames'], []),
    tableData: lensPathWithDefault(['debugTables', 'tableData'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['debugTables', 'errors'], [])
}

export default debugTablesModel
