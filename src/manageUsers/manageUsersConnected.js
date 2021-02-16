import {createConnected} from '../library/connected-util'
import manageUsersEvent from "./manageUsersEvent";
import manageUsersDispatch from './manageUsersDispatch'
import manageUsersModel from "./manageUsersModel";
import manageUsersReducer from "./manageUsersReducer";
import manageUsersEffect from "./manageUsersEffect";
import ManageUsers from './ManageUsers'

const createManageUsersConnected = componentDependencyMap => {
    return createConnected({
        name: 'manageUsers',
        model: manageUsersModel,
        dispatch: manageUsersDispatch,
        View: ManageUsers,
        reducerMap: manageUsersReducer,
        effectMap: manageUsersEffect,
        genericErrorHandler: manageUsersEvent.GENERIC_ERROR,
        componentDependencyMap
    })
}

export default createManageUsersConnected
