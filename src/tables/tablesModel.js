import {lensPathWithDefault} from '../library/lens-util';

const tablesModel = {
    selectedTableName: lensPathWithDefault(['tables', 'selectedTableName'], 'user'),
    tableNames: lensPathWithDefault(['tables', 'tableNames'], []),
    tableData: lensPathWithDefault(['tables', 'tableData'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['tables', 'errors'], [])
}

export default tablesModel
