import {createConnected} from '../library/connected-util'
import adminEvent from "./adminEvent";
import adminDispatch from './adminDispatch'
import adminModel from "./adminModel";
import adminReducer from "./adminReducer";
import adminEffect from "./adminEffect";
import Admin from './Admin'

const createAdminConnected = componentDependencyMap => {
    return createConnected({
        name: 'admin',
        model: adminModel,
        dispatch: adminDispatch,
        View: Admin,
        reducerMap: adminReducer,
        effectMap: adminEffect,
        genericErrorHandler: adminEvent.GENERIC_ERROR,
        componentDependencyMap
    })
}

export default createAdminConnected
