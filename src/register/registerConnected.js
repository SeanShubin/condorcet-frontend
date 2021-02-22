import {createConnected} from '../library/connected-util'
import registerEvent from "./registerEvent";
import registerDispatch from './registerDispatch'
import registerModel from "./registerModel";
import registerReducer from "./registerReducer";
import registerEffect from "./registerEffect";
import Register from './Register'

const createRegisterConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'register',
        model: registerModel,
        dispatch: registerDispatch,
        View: Register,
        reducerMap: registerReducer,
        effectMap: registerEffect,
        genericErrorHandler: registerEvent.GENERIC_ERROR,
        extraState,
        extraDispatch
    })
}

export default createRegisterConnected
