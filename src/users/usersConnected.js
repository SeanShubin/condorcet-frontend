import {createConnected} from '../library/connected-util'
import usersDispatch from './usersDispatch'
import usersModel from "./usersModel";
import usersReducer from "./usersReducer";
import usersEffect from "./usersEffect";
import Users from './Users'

const createUsersConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'users',
        model: usersModel,
        dispatch: usersDispatch,
        View: Users,
        reducerMap: usersReducer,
        effectMap: usersEffect,
        extraState,
        extraDispatch
    })
}

export default createUsersConnected
