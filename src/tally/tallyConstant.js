const tallyUriPattern = /^\/tally($|\/)/
const tallyPageName = 'tally'
const createTallyPagePath = election => `/tally?election=${election}`
const parseFromTallyUri = uri => {
    const params = new URLSearchParams(uri)
    const election = params.get('election')
    return election
}

export {tallyUriPattern, tallyPageName, createTallyPagePath, parseFromTallyUri}
