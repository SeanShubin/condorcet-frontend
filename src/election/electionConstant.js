const electionUriPattern = /^\/election($|\/)/
const createElectionPagePath = election => `/election?election=${election}`
const parseFromElectionUri = uri => {
    const params = new URLSearchParams(uri)
    const electionName = params.get('election')
    return electionName
}

export {electionUriPattern, createElectionPagePath, parseFromElectionUri}
