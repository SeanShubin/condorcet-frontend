import {createConnected} from '../library/connected-util'
import electionsEvent from "./electionsEvent";
import electionsDispatch from './electionsDispatch'
import electionsModel from "./electionsModel";
import electionsReducer from "./electionsReducer";
import electionsEffect from "./electionsEffect";
import Elections from './Elections'

const createElectionsConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'elections',
        model: electionsModel,
        dispatch: electionsDispatch,
        View: Elections,
        reducerMap: electionsReducer,
        effectMap: electionsEffect,
        genericErrorHandler: electionsEvent.GENERIC_ERROR,
        extraState,
        extraDispatch
    })
}

export default createElectionsConnected
