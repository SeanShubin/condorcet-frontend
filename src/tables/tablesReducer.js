import tablesEvent from './tablesEvent';
import tablesModel from "./tablesModel";
import {appendToArray} from "../library/collection-util";

const errorAdded = (state, event) => appendToArray(tablesModel.errors, event.message, state)

const tablesReducer = {
    [tablesEvent.ERROR_ADDED]: errorAdded
}

export default tablesReducer
