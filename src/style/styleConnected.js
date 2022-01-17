import {createConnected} from '../library/connected-util'
import Style from "./Style";

const createStyleConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'style',
        requiresLogin: false,
        View: Style,
        extraState,
        extraDispatch
    })
}

export default createStyleConnected
