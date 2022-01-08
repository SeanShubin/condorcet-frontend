const electionUriPattern = /^\/election($|\/)/
const electionPageName = 'election'
const createElectionPagePath = election => `/election?election=${election}`

export {electionUriPattern, electionPageName, createElectionPagePath}
