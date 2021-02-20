import {createConnected} from '../library/connected-util'
import eventsEvent from "./eventsEvent";
import eventsDispatch from './eventsDispatch'
import eventsModel from "./eventsModel";
import eventsReducer from "./eventsReducer";
import eventsEffect from "./eventsEffect";
import Events from './Events'

const createEventsConnected = componentDependencyMap => {
    return createConnected({
        name: 'events',
        model: eventsModel,
        dispatch: eventsDispatch,
        View: Events,
        reducerMap: eventsReducer,
        effectMap: eventsEffect,
        genericErrorHandler: eventsEvent.GENERIC_ERROR,
        componentDependencyMap
    })
}

export default createEventsConnected
