const debugTablesUriPattern = /^\/debugTables($|\/)/
const debugTablesPageName = 'debugTables'
const defaultTable = 'user'

const orDefaultTable = table => {
    if(table) {
        return table
    } else {
        return defaultTable
    }
}

const parseDebugTableFromUri = uri => {
    const params = new URLSearchParams(uri)
    return orDefaultTable(params.get('table'))
}

const createDebugTablesPagePath = table => {
    return `/debugTables?table=${orDefaultTable(table)}`
}

export {debugTablesUriPattern, debugTablesPageName, createDebugTablesPagePath, parseDebugTableFromUri}
