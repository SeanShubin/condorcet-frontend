import {createConnected} from '../library/connected-util'
import electionEvent from "./electionEvent";
import electionDispatch from './electionDispatch'
import electionModel from "./electionModel";
import electionReducer from "./electionReducer";
import electionEffect from "./electionEffect";
import Election from './Election'

const createElectionConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'election',
        model: electionModel,
        dispatch: electionDispatch,
        View: Election,
        reducerMap: electionReducer,
        effectMap: electionEffect,
        genericErrorHandler: electionEvent.GENERIC_ERROR,
        extraState,
        extraDispatch
    })
}

export default createElectionConnected
