import * as R from 'ramda'
import {all, call} from 'redux-saga/effects';

const composeReducer = connectedArray => {
    const reducers = R.map(connected => connected.reducer, connectedArray)
    const newReducer = (state, event) => {
        const accumulateState = (accumulator, reducer) => reducer(accumulator, event)
        const newState = R.reduce(accumulateState, state, reducers)
        return newState
    }
    return newReducer

}
const composeSagaFromArray = connectedArray => environment => function* () {
    yield all(R.map(connected => call(connected.saga(environment)), connectedArray))
}

export {composeReducer, composeSagaFromArray}
