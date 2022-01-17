const defaultTable = 'user'

const orDefaultTable = table => {
    if(table) {
        return table
    } else {
        return defaultTable
    }
}

const createDebugTablesPagePath = table => {
    return `/debugTables?table=${orDefaultTable(table)}`
}

export {createDebugTablesPagePath}
