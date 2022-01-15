const electionUriPattern = /^\/election($|\/)/
const electionPageName = 'election'
const createElectionPagePath = election => `/election?election=${election}`
const parseFromElectionUri = uri => {
    const params = new URLSearchParams(uri)
    const electionName = params.get('election')
    return electionName
}

export {electionUriPattern, electionPageName, createElectionPagePath, parseFromElectionUri}
