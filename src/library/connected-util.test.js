import '@testing-library/jest-dom/extend-expect'
import {lensPathWithDefault} from "./lens-util";
import {composeMapStateToProps} from "./connected-util";

test('composeMapStateToProps, typical', () => {
    // given
    const model = {
        foo: lensPathWithDefault(['test', 'foo'], 0),
        bar: lensPathWithDefault(['test', 'bar'], 0),
    }
    const state = {
        test: {
            foo: 123,
            bar: 456
        }
    }
    const extraState = {
        baz: 789
    }
    const mapStateToProps = composeMapStateToProps({model, extraState})
    const expected = {foo: 123, bar: 456, baz: 789}

    // when
    const actual = mapStateToProps(state)

    // then
    expect(actual).toEqual(expected)
})

test('composeMapStateToProps, undefined extraState', () => {
    // given
    const model = {
        foo: lensPathWithDefault(['test', 'foo'], 0),
        bar: lensPathWithDefault(['test', 'bar'], 0),
    }
    const state = {
        test: {
            foo: 123,
            bar: 456
        }
    }
    const extraState = undefined
    const mapStateToProps = composeMapStateToProps({model, extraState})
    const expected = {foo: 123, bar: 456}

    // when
    const actual = mapStateToProps(state)

    // then
    expect(actual).toEqual(expected)
})
