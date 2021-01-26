import loginEvent from './loginEvent';
import loginModel from "./loginModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const nameOrEmailChanged = (state, event) => R.set(loginModel.nameOrEmail, event.nameOrEmail, state)
const passwordChanged = (state, event) => R.set(loginModel.password, event.password, state)
const errorAdded = (state, event) => appendToArray(loginModel.errors, event.message, state)

const loginReducer = {
    [loginEvent.NAME_OR_EMAIL_CHANGED]: nameOrEmailChanged,
    [loginEvent.PASSWORD_CHANGED]: passwordChanged,
    [loginEvent.ERROR_ADDED]: errorAdded
}

export default loginReducer
