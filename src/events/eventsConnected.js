import {createConnected} from '../library/connected-util'
import eventsDispatch from './eventsDispatch'
import eventsModel from "./eventsModel";
import eventsReducer from "./eventsReducer";
import eventsEffect from "./eventsEffect";
import Events from './Events'

const createEventsConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'events',
        requiresLogin: true,
        model: eventsModel,
        dispatch: eventsDispatch,
        View: Events,
        reducerMap: eventsReducer,
        effectMap: eventsEffect,
        extraState,
        extraDispatch
    })
}

export default createEventsConnected
