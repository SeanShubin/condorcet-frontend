const ballotUriPattern = /^\/ballot($|\/)/
const ballotPageName = 'ballot'
const createBallotPagePath = election => `/ballot?election=${election}`

export {ballotUriPattern, ballotPageName, createBallotPagePath}
