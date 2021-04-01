import '@testing-library/jest-dom/extend-expect'
import {composeReducer, composeSagaFromArray} from "./compose-util";
import {applyMiddleware, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'


import * as R from 'ramda'
import {composeSagaFromEffectMap} from "./connected-util";

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

test('compose saga', () => {
    // given
    const fooEvent = {type: 'foo', payload: 'foo content'}
    const barEvent = {type: 'bar', payload: 'bar content'}
    const events = []
    const recordEvent = (source, event) => {
        events.push({source, event})
    }
    const environment = {
        recordEvent
    }
    const fooEffect = environment => function* (event) {
        environment.recordEvent('fooEffect', event)
    }
    const barEffect = environment => function* (event) {
        environment.recordEvent('barEffect', event)
    }
    const fooEffectMap = {
        foo: fooEffect
    }
    const barEffectMap = {
        bar: barEffect
    }
    const fooConnected = {
        saga: composeSagaFromEffectMap(fooEffectMap)
    }
    const barConnected = {
        saga: composeSagaFromEffectMap(barEffectMap)
    }
    const connectedArray = [fooConnected, barConnected]
    const reducer = (state, event) => state
    const state = {}
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        reducer,
        state,
        applyMiddleware(sagaMiddleware)
    )
    const saga = composeSagaFromArray(connectedArray)(environment)
    sagaMiddleware.run(saga)
    const expected = [
        {
            source: 'fooEffect',
            event: {type: 'foo', payload: 'foo content'}
        },
        {
            source: 'barEffect',
            event: {type: 'bar', payload: 'bar content'}
        }
    ]

    // when
    store.dispatch(fooEvent)
    store.dispatch(barEvent)

    // then
    expect(events).toEqual(expected)
})
