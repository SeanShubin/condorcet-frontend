import {createConnected} from '../library/connected-util'
import tallyDispatch from './tallyDispatch'
import tallyModel from "./tallyModel";
import tallyReducer from "./tallyReducer";
import tallyEffect from "./tallyEffect";
import Tally from './Tally'

const createTallyConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'tally',
        requiresLogin: true,
        model: tallyModel,
        dispatch: tallyDispatch,
        View: Tally,
        reducerMap: tallyReducer,
        effectMap: tallyEffect,
        extraState,
        extraDispatch
    })
}

export default createTallyConnected
