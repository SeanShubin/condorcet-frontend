import {createConnected} from '../library/connected-util'
import votersDispatch from './votersDispatch'
import votersModel from "./votersModel";
import votersReducer from "./votersReducer";
import votersEffect from "./votersEffect";
import Voters from './Voters'

const createVotersConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'voters',
        model: votersModel,
        dispatch: votersDispatch,
        View: Voters,
        reducerMap: votersReducer,
        effectMap: votersEffect,
        extraState,
        extraDispatch
    })
}

export default createVotersConnected
