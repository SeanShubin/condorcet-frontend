const tablesUriPattern = /^\/tables($|\/)/
const tablesPageName = 'tables'
const defaultTable = 'user'

const orDefaultTable = table => {
    if(table) {
        return table
    } else {
        return defaultTable
    }
}

const parseTableFromUri = uri => {
    const params = new URLSearchParams(uri)
    return orDefaultTable(params.get('table'))
}

const createTablesPagePath = table => {
    return `/tables?table=${orDefaultTable(table)}`
}

export {tablesUriPattern, tablesPageName, createTablesPagePath, parseTableFromUri}
