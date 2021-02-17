import tablesEvent from "./tablesEvent";

const tablesDispatch = {
    errorAdded: message => ({type: tablesEvent.ERROR_ADDED, message})
}

export default tablesDispatch
