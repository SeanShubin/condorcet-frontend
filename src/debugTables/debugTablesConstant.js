const debugTablesPagePath = '/debugTables'

const createDebugTablesPagePath = table => {
    return `/debugTables?table=${table}`
}

export {debugTablesPagePath,createDebugTablesPagePath}
