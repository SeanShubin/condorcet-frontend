const ballotUriPattern = /^\/ballot($|\/)/
const ballotPageName = 'ballot'
const createBallotPagePath = ({voter, election}) => `/ballot?voter=${voter}&election=${election}`
const parseFromBallotUri = uri => {
    const params = new URLSearchParams(uri)
    const voterName = params.get('voter')
    const electionName = params.get('election')
    return {voterName, electionName}
}

export {ballotUriPattern, ballotPageName, createBallotPagePath, parseFromBallotUri}
