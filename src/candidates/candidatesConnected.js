import {createConnected} from '../library/connected-util'
import candidatesDispatch from './candidatesDispatch'
import candidatesModel from "./candidatesModel";
import candidatesReducer from "./candidatesReducer";
import candidatesEffect from "./candidatesEffect";
import Candidates from './Candidates'

const createCandidatesConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'candidates',
        requiresLogin: true,
        model: candidatesModel,
        dispatch: candidatesDispatch,
        View: Candidates,
        reducerMap: candidatesReducer,
        effectMap: candidatesEffect,
        extraState,
        extraDispatch
    })
}

export default createCandidatesConnected
