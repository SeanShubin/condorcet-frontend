import {createConnected} from '../library/connected-util'
import manageUsersDispatch from './manageUsersDispatch'
import manageUsersModel from "./manageUsersModel";
import manageUsersReducer from "./manageUsersReducer";
import manageUsersEffect from "./manageUsersEffect";
import ManageUsers from './ManageUsers'

const createManageUsersConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'manageUsers',
        model: manageUsersModel,
        dispatch: manageUsersDispatch,
        View: ManageUsers,
        reducerMap: manageUsersReducer,
        effectMap: manageUsersEffect,
        extraState,
        extraDispatch
    })
}

export default createManageUsersConnected
