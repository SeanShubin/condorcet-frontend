import {createConnected} from '../library/connected-util'
import loginDispatch from './loginDispatch'
import loginModel from "./loginModel";
import loginReducer from "./loginReducer";
import loginEffect from "./loginEffect";
import Login from './Login'

const createLoginConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'login',
        requiresLogin: false,
        model: loginModel,
        dispatch: loginDispatch,
        View: Login,
        reducerMap: loginReducer,
        effectMap: loginEffect,
        extraState,
        extraDispatch
    })
}

export default createLoginConnected
