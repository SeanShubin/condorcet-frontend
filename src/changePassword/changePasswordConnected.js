import {createConnected} from '../library/connected-util'
import changePasswordDispatch from './changePasswordDispatch'
import changePasswordModel from "./changePasswordModel";
import changePasswordReducer from "./changePasswordReducer";
import changePasswordEffect from "./changePasswordEffect";
import ChangePassword from './ChangePassword'

const createChangePasswordConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'changePassword',
        model: changePasswordModel,
        dispatch: changePasswordDispatch,
        View: ChangePassword,
        reducerMap: changePasswordReducer,
        effectMap: changePasswordEffect,
        extraState,
        extraDispatch
    })
}

export default createChangePasswordConnected
