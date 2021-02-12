import dashboardEvent from './dashboardEvent';
import dashboardModel from "./dashboardModel";
import {appendToArray} from "../library/collection-util";

const errorAdded = (state, event) => appendToArray(dashboardModel.errors, event.message, state)

const dashboardReducer = {
    [dashboardEvent.ERROR_ADDED]: errorAdded
}

export default dashboardReducer
