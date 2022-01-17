import navigationDispatch from './navigationDispatch';
import navigationModel from "./navigationModel";
import navigationReducer from './navigationReducer'
import navigationEffect from "./navigationEffect";
import Navigation from './Navigation';

import {createConnected} from "../library/connected-util";

const createNavigationConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'navigation',
        requiresLogin: false,
        model: navigationModel,
        dispatch: navigationDispatch,
        View: Navigation,
        reducerMap: navigationReducer,
        effectMap: navigationEffect,
        extraState,
        extraDispatch
    })
}

export default createNavigationConnected
