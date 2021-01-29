const createEnvironment = (
    {
        fetch,
        history,
        sessionStorage
    }) => {
    return {
        history,
        fetch: (resource, init) => fetch(resource, init),
        sessionStorage
    }
}

export default createEnvironment
