import {createConnected} from '../library/connected-util'
import ballotDispatch from './ballotDispatch'
import ballotModel from "./ballotModel";
import ballotReducer from "./ballotReducer";
import ballotEffect from "./ballotEffect";
import Ballot from './Ballot'

const createBallotConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'ballot',
        model: ballotModel,
        dispatch: ballotDispatch,
        View: Ballot,
        reducerMap: ballotReducer,
        effectMap: ballotEffect,
        extraState,
        extraDispatch
    })
}

export default createBallotConnected
