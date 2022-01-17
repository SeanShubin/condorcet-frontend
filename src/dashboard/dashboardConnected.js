import {createConnected} from '../library/connected-util'
import dashboardDispatch from './dashboardDispatch'
import dashboardModel from "./dashboardModel";
import dashboardReducer from "./dashboardReducer";
import dashboardEffect from "./dashboardEffect";
import Dashboard from './Dashboard'

const createDashboardConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'dashboard',
        requiresLogin: true,
        model: dashboardModel,
        dispatch: dashboardDispatch,
        View: Dashboard,
        reducerMap: dashboardReducer,
        effectMap: dashboardEffect,
        extraState,
        extraDispatch
    })
}

export default createDashboardConnected
