import {createConnected} from '../library/connected-util'
import debugTablesDispatch from './debugTablesDispatch'
import debugTablesModel from "./debugTablesModel";
import debugTablesReducer from "./debugTablesReducer";
import debugTablesEffect from "./debugTablesEffect";
import DebugTables from './DebugTables'

const createDebugTablesConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'debugTables',
        model: debugTablesModel,
        dispatch: debugTablesDispatch,
        View: DebugTables,
        reducerMap: debugTablesReducer,
        effectMap: debugTablesEffect,
        extraState,
        extraDispatch
    })
}

export default createDebugTablesConnected
