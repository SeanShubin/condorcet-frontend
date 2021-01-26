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

const pairToObject = R.apply(R.objOf)

const pairsToObject = pairArray => {
    const objects = R.map(pairToObject, pairArray)
    const initialValue = {}
    return R.reduce(mergeDisallowDuplicateKeys, initialValue, objects)
}

export {appendToArray, mergeDisallowDuplicateKeys}
