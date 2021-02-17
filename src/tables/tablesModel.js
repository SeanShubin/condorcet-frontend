import {lensPathWithDefault} from '../library/lens-util';

const tablesModel = {
    selectedName: lensPathWithDefault(['tables', 'selectedName'], 'user'),
    names: lensPathWithDefault(['tables', 'names'], []),
    table: lensPathWithDefault(['tables', 'table'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['tables', 'errors'], [])
}

export default tablesModel
