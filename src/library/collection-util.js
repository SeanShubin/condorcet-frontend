import * as R from "ramda";

const appendToArray = (lens, value, state) => {
    const oldArray = R.view(lens, state)
    const newArray = R.concat(oldArray, [value])
    return R.set(lens, newArray, state)
}

const mergeDisallowDuplicateKeys = (left, right) => {
    const disallowDuplicateKey = key => {
        throw Error(`duplicate key '${key}'`)
    }
    return R.mergeWithKey(disallowDuplicateKey, left, right)
}

const delta = ({fromValue, toValue}) => {
    const updatedOrAdded = R.fromPairs(R.difference(R.toPairs(toValue), R.toPairs(fromValue)))
    const removedKeys = R.difference(R.keys(fromValue), R.keys(toValue))
    const removed = R.fromPairs(R.map(x => R.pair(x, null), removedKeys))
    const computed = R.merge(updatedOrAdded, removed)
    return computed
}

export {appendToArray, mergeDisallowDuplicateKeys, delta}
