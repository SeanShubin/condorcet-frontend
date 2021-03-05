import {delta, mergeDisallowDuplicateKeys} from "./collection-util";
import '@testing-library/jest-dom/extend-expect'

const captureException = f => {
    let exception
    let result
    try {
        result = f()
    } catch (error) {
        exception = error
    }
    if (exception) {
        return exception
    } else {
        throw Error(`should have thrown exception, got ${result} instead`)
    }
}

test('mergeDisallowDuplicateKeys, no duplicates', () => {
    // given
    const left = {a: 123, b: 234}
    const right = {c: 345, d: 456}
    const expected = {a: 123, b: 234, c: 345, d: 456}

    // when
    const actual = mergeDisallowDuplicateKeys(left, right)

    // then
    expect(actual).toEqual(expected)
})

test('mergeDisallowDuplicateKeys, duplicates', () => {
    // given
    const left = {a: 123, b: 234}
    const right = {b: 345, c: 456}
    const expected = "duplicate key 'b'"

    // when
    const actual = captureException(() => mergeDisallowDuplicateKeys(left, right))

    // then
    expect(actual.message).toEqual(expected)
})

test('delta', () => {
    const fromValue = {a: 1, b: 2, c: 3, d: 4}
    const toValue = {a: 1, c: 5, d: 4, e: 6}
    const expected = {b: null, c: 5, e: 6}
    const actual = delta({fromValue, toValue})
    expect(actual).toEqual(expected)
})
