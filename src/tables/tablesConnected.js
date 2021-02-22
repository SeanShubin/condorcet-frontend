import {createConnected} from '../library/connected-util'
import tablesEvent from "./tablesEvent";
import tablesDispatch from './tablesDispatch'
import tablesModel from "./tablesModel";
import tablesReducer from "./tablesReducer";
import tablesEffect from "./tablesEffect";
import Tables from './Tables'

const createTablesConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'tables',
        model: tablesModel,
        dispatch: tablesDispatch,
        View: Tables,
        reducerMap: tablesReducer,
        effectMap: tablesEffect,
        genericErrorHandler: tablesEvent.GENERIC_ERROR,
        extraState,
        extraDispatch
    })
}

export default createTablesConnected
