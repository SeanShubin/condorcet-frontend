const ballotUriPattern = /^\/ballot($|\/)/
const ballotPageName = 'ballot'
const createBallotPagePath = ({voter, election}) => `/ballot?voter=${voter}&election=${election}`
const parseFromBallotUri = uri => {
    const params = new URLSearchParams(uri)
    const voter = params.get('voter')
    const election = params.get('election')
    return {voter, election}
}

export {ballotUriPattern, ballotPageName, createBallotPagePath, parseFromBallotUri}
