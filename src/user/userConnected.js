import {createConnected} from '../library/connected-util'
import userDispatch from './userDispatch'
import userModel from "./userModel";
import userReducer from "./userReducer";
import userEffect from "./userEffect";
import User from './User'

const createUserConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'user',
        model: userModel,
        dispatch: userDispatch,
        View: User,
        reducerMap: userReducer,
        effectMap: userEffect,
        extraState,
        extraDispatch
    })
}

export default createUserConnected
