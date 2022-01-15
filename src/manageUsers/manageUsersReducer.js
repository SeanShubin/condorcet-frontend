import manageUsersEvent from './manageUsersEvent';
import manageUsersModel from "./manageUsersModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const usersChanged = (state, event) => R.set(manageUsersModel.users, event.users, state)
const errorAdded = (state, event) => appendToArray(manageUsersModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(manageUsersModel.errors, [], state)

const manageUsersReducer = {
    [manageUsersEvent.USERS_CHANGED]: usersChanged,
    [manageUsersEvent.ERROR_ADDED]: errorAdded,
    [manageUsersEvent.CLEAR_ERRORS]: clearErrors
}

export default manageUsersReducer
