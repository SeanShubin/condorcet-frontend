import {createConnected} from '../library/connected-util'
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
        extraState,
        extraDispatch
    })
}

export default createRegisterConnected
