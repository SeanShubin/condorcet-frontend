import dashboardEvent from './dashboardEvent';
import dashboardModel from "./dashboardModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchNameSuccess = (state, event) => R.set(dashboardModel.name, event.name, state)
const errorAdded = (state, event) => appendToArray(dashboardModel.errors, event.message, state)

const dashboardReducer = {
    [dashboardEvent.FETCH_NAME_SUCCESS]: fetchNameSuccess,
    [dashboardEvent.ERROR_ADDED]: errorAdded
}

export default dashboardReducer
