import {createConnected} from '../library/connected-util'
import resetPasswordDispatch from './resetPasswordDispatch'
import resetPasswordModel from "./resetPasswordModel";
import resetPasswordReducer from "./resetPasswordReducer";
import resetPasswordEffect from "./resetPasswordEffect";
import ResetPassword from './ResetPassword'

const createResetPasswordConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'resetPassword',
        model: resetPasswordModel,
        dispatch: resetPasswordDispatch,
        View: ResetPassword,
        reducerMap: resetPasswordReducer,
        effectMap: resetPasswordEffect,
        extraState,
        extraDispatch
    })
}

export default createResetPasswordConnected
