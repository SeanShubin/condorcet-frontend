import navigationEvent from "./navigationEvent";
import navigationDispatch from './navigationDispatch';
import navigationModel from "./navigationModel";
import navigationReducer from './navigationReducer'
import navigationEffect from "./navigationEffect";
import Navigation from './Navigation';

import {createConnected} from "../library/connected-util";

const createNavigationConnected = ({extraState, extraDispatch}) => {
    return createConnected({
        name: 'navigation',
        model: navigationModel,
        dispatch: navigationDispatch,
        View: Navigation,
        reducerMap: navigationReducer,
        effectMap: navigationEffect,
        genericErrorHandler: navigationEvent.GENERIC_ERROR,
        extraState,
        extraDispatch
    })
}

export default createNavigationConnected
