const defaultTable = 'user'

const orDefaultTable = table => {
    if(table) {
        return table
    } else {
        return defaultTable
    }
}

const createTablesPagePath = table => {
    return `/tables?table=${orDefaultTable(table)}`
}

export {createTablesPagePath}
