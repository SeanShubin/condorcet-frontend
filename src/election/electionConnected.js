import {createConnected} from '../library/connected-util'
import electionDispatch from './electionDispatch'
import electionModel from "./electionModel";
import electionReducer from "./electionReducer";
import electionEffect from "./electionEffect";
import Election from './Election'

const createElectionConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'election',
        requiresLogin: true,
        model: electionModel,
        dispatch: electionDispatch,
        View: Election,
        reducerMap: electionReducer,
        effectMap: electionEffect,
        extraState,
        extraDispatch
    })
}

export default createElectionConnected
