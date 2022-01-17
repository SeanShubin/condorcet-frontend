const candidatesUriPattern = /^\/candidates($|\/)/
const createCandidatesPagePath = election => `/candidates?election=${election}`
const parseFromCandidatesUri = uri => {
    const params = new URLSearchParams(uri)
    const election = params.get('election')
    return election
}

export {candidatesUriPattern, createCandidatesPagePath, parseFromCandidatesUri}
