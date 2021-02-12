import adminEvent from './adminEvent';
import adminModel from "./adminModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const usersChanged = (state, event) => R.set(adminModel.users, event.users, state)
const errorAdded = (state, event) => appendToArray(adminModel.errors, event.message, state)

const adminReducer = {
    [adminEvent.USERS_CHANGED]: usersChanged,
    [adminEvent.ERROR_ADDED]: errorAdded
}

export default adminReducer
