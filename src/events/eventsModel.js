import {lensPathWithDefault} from '../library/lens-util';

const eventsModel = {
    table: lensPathWithDefault(['events', 'table'], {
        columnNames: [],
        rows: []
    }),
    errors: lensPathWithDefault(['events', 'errors'], [])
}

export default eventsModel
