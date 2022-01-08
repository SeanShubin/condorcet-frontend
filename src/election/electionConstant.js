const electionUriPattern = /^\/election($|\/)/
const electionPageName = 'election'
const createElectionPagePath = election => `/election?election=${election}`
const parseFromElectionUri = uri => {
    const params = new URLSearchParams(uri)
    const election = params.get('election')
    return election
}

export {electionUriPattern, electionPageName, createElectionPagePath, parseFromElectionUri}
