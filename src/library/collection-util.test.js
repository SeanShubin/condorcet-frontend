import {mergeDisallowDuplicateKeys} from "./collection-util";
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
