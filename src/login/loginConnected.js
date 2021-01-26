import {createConnected} from '../library/connected-util'
import loginEvent from "./loginEvent";
import loginDispatch from './loginDispatch'
import loginModel from "./loginModel";
import loginReducer from "./loginReducer";
import loginEffect from "./loginEffect";
import Login from './Login'

const createLoginConnected = componentDependencyMap => {
    return createConnected({
        name: 'login',
        model: loginModel,
        dispatch: loginDispatch,
        View: Login,
        reducerMap: loginReducer,
        effectMap: loginEffect,
        genericErrorHandler: loginEvent.GENERIC_ERROR,
        componentDependencyMap
    })
}

export default createLoginConnected
