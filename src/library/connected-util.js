import {connect} from 'react-redux';
import * as R from 'ramda'
import {mergeDisallowDuplicateKeys} from "./collection-util";
import {takeEvery} from 'redux-saga/effects';

const composeMapStateToProps = ({model, extraState = {}}) => state => {
    const createGetter = lens => R.view(lens, state)
    const getterMap = R.map(createGetter, model)
    return mergeDisallowDuplicateKeys(getterMap, extraState)

}

const composeMapDispatchToProps = ({dispatch, extraDispatch}) => {
    return mergeDisallowDuplicateKeys(dispatch, extraDispatch)
}

const composeReducer = reducerMap => (state, event) => {
    const reducer = reducerMap[event.type]
    if (reducer) {
        return reducer(state, event)
    } else {
        return state
    }
}

const composeSaga = effectMap => environment => function* () {
    const names = Object.keys(effectMap)
    for (const name of names) {
        const successHandler = effectMap[name](environment)
        const handler = function* (...args) {
            try {
                yield* successHandler(...args)
            } catch (error) {
                environment.genericError({name, args, error})
            }
        }

        yield takeEvery(name, handler)
    }
}

const createConnected = ({
                             name,
                             model,
                             dispatch,
                             View = (() => <div>Component '{name}' undefined</div>),
                             reducerMap = {},
                             effectMap = {},
                             extraState = {},
                             extraDispatch = {}
                         }) => {
    const mapStateToProps = composeMapStateToProps({model, extraState})
    const mapDispatchToProps = composeMapDispatchToProps({dispatch, extraDispatch})
    const Component = connect(mapStateToProps, mapDispatchToProps)(View)
    const reducer = composeReducer(reducerMap)
    const saga = composeSaga(effectMap)
    return {
        name,
        Component,
        reducer,
        saga,
        mapStateToProps,
        model
    }
}

export {createConnected, composeMapStateToProps}
