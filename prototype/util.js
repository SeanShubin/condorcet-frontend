import * as R from "ramda";
import {mergeDisallowDuplicateKeys} from "../src/library/collection-util";

const pairsToObject = pairArray => {
    const objects = R.map(pairToObject, pairArray)
    const initialValue = {}
    return R.reduce(mergeDisallowDuplicateKeys, initialValue, objects)
}

const pairToObject = R.apply(R.objOf)

