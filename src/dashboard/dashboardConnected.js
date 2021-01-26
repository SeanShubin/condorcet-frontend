import {createConnected} from '../library/connected-util'
import dashboardEvent from "./dashboardEvent";
import dashboardDispatch from './dashboardDispatch'
import dashboardModel from "./dashboardModel";
import dashboardReducer from "./dashboardReducer";
import dashboardEffect from "./dashboardEffect";
import Dashboard from './Dashboard'

const createDashboardConnected = componentDependencyMap => {
    return createConnected({
        name: 'dashboard',
        model: dashboardModel,
        dispatch: dashboardDispatch,
        View: Dashboard,
        reducerMap: dashboardReducer,
        effectMap: dashboardEffect,
        genericErrorHandler: dashboardEvent.GENERIC_ERROR,
        componentDependencyMap
    })
}

export default createDashboardConnected
