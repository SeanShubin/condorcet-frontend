import {lensPathWithDefault} from '../library/lens-util';

const eventsModel = {
    tableData: lensPathWithDefault(['events', 'tableData'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['events', 'errors'], [])
}

export default eventsModel
