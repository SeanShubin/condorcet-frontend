const createEnvironment = (
    {
        fetch,
        history,
        sessionStorage
    }) => {
    return {
        history,
        fetch,
        sessionStorage
    }
}

export default createEnvironment
