import * as R from 'ramda'

const ErrorComponent = ({errors}) => {
    if (R.isNil(errors) || R.isEmpty(errors)) {
        return null
    } else {
        const indices = R.range(0, errors.length)
        const indexedErrors = R.zip(indices, errors)
        const createComponent = indexedError => <pre key={indexedError[0]}>{indexedError[1]}</pre>
        const errorComponents = R.map(createComponent, indexedErrors)
        return <div className={'error'}>{errorComponents}</div>
    }
}

export default ErrorComponent
