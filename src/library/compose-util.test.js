import '@testing-library/jest-dom/extend-expect'
import {composeReducer} from "./compose-util";
import * as R from 'ramda'

test('compose reducer', () => {
    // given
    const fooLens = R.lensPath(['foo', 'value'])
    const barLens = R.lensPath(['bar', 'value'])
    const fooReducer = (state, event) => {
        if (event.type === 'SET_FOO') {
            const newState = R.set(fooLens, event.value, state)
            return newState
        } else {
            return state
        }
    }
    const barReducer = (state, event) => {
        if (event.type === 'SET_BAR') {
            const newState = R.set(barLens, event.value, state)
            return newState
        } else {
            return state
        }
    }
    const fooConnected = {
        reducer: fooReducer
    }
    const barConnected = {
        reducer: barReducer
    }
    const connectedArray = [fooConnected, barConnected]

    // when
    const reducer = composeReducer(connectedArray)

    // then
    const oldState = R.pipe(
        R.set(fooLens, 'old foo'),
        R.set(barLens, 'old bar')
    )({})
    const fooEvent = {type: 'SET_FOO', value: 'new foo'}
    const barEvent = {type: 'SET_BAR', value: 'new bar'}
    const newStateA = reducer(oldState, fooEvent)
    const newStateB = reducer(newStateA, barEvent)
    const expectedState = R.pipe(
        R.set(fooLens, 'new foo'),
        R.set(barLens, 'new bar')
    )({})
    expect(newStateB).toEqual(expectedState)
})
