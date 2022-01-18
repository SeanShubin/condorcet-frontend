import {lensPathWithDefault} from '../library/lens-util';

const tablesModel = {
    selectedTableName: lensPathWithDefault(['tables', 'selectedTableName'], 'user'),
    tableNames: lensPathWithDefault(['tables', 'tableNames'], []),
    selectedTableData: lensPathWithDefault(['tables', 'selectedTableData'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['tables', 'errors'], [])
}

export default tablesModel
