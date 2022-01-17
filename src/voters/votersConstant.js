const votersUriPattern = /^\/voters($|\/)/
const createVotersPagePath = election => `/voters?election=${election}`
const parseFromVotersUri = uri => {
    const params = new URLSearchParams(uri)
    const election = params.get('election')
    return election
}

export {votersUriPattern, createVotersPagePath, parseFromVotersUri}
