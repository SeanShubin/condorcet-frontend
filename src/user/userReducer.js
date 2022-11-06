import userEvent from './userEvent';
import userModel from "./userModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const nameChanged = (state, event) => R.set(userModel.editedName, event.name, state)
const emailChanged = (state, event) => R.set(userModel.editedEmail, event.email, state)
const fetchUserSuccess = (state, event) => {
    const {name, email} = event
    return R.pipe(
        R.set(userModel.originalName, name),
        R.set(userModel.originalEmail, email),
        R.set(userModel.editedName, name),
        R.set(userModel.editedEmail, email)
    )(state)
}
const errorAdded = (state, event) => appendToArray(userModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(userModel.errors, [], state)

const userReducer = {
    [userEvent.NAME_CHANGED]: nameChanged,
    [userEvent.EMAIL_CHANGED]: emailChanged,
    [userEvent.FETCH_USER_SUCCESS]: fetchUserSuccess,
    [userEvent.ERROR_ADDED]: errorAdded,
    [userEvent.CLEAR_ERRORS]: errorsCleared
}

export default userReducer
