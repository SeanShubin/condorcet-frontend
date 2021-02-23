import {lensPathWithDefault} from '../library/lens-util';

const debugTablesModel = {
    selectedName: lensPathWithDefault(['debugTables', 'selectedName'], 'user'),
    names: lensPathWithDefault(['debugTables', 'names'], []),
    table: lensPathWithDefault(['debugTables', 'table'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['debugTables', 'errors'], [])
}

export default debugTablesModel
