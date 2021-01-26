import util from 'util'

const objectToString = o => {
    return util.inspect(o)
}

const composeFetchErrorMessage = ({resource, init, error}) => {
    return objectToString({resource, init, error})
}

const composeFetchJsonErrorMessage = ({resource, init, text, error}) => {
    return objectToString({resource, init, error}) + '\n' + text
}

const composeErrorEventMessage = ({error, event}) => {
    return objectToString({error, event})
}

export {composeErrorEventMessage, composeFetchErrorMessage, composeFetchJsonErrorMessage}