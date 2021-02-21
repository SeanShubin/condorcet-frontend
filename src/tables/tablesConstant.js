const tablesUriPattern = /^\/tables($|\/)/
const tablesPageName = 'tables'
const tablesPagePath = table => `/tables?table=${table}`

export {tablesUriPattern, tablesPageName, tablesPagePath}
