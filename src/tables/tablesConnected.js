import {createConnected} from '../library/connected-util'
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
        extraState,
        extraDispatch
    })
}

export default createTablesConnected
