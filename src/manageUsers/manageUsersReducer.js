import manageUsersEvent from './manageUsersEvent';
import manageUsersModel from "./manageUsersModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const usersChanged = (state, event) => R.set(manageUsersModel.users, event.users, state)
const errorAdded = (state, event) => appendToArray(manageUsersModel.errors, event.message, state)

const manageUsersReducer = {
    [manageUsersEvent.USERS_CHANGED]: usersChanged,
    [manageUsersEvent.ERROR_ADDED]: errorAdded
}

export default manageUsersReducer
