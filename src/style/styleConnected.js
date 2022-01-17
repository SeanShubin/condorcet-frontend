import {createConnected} from '../library/connected-util'
import Style from "./Style";
import styleDispatch from "./styleDispatch";
import styleEffect from "./styleEffect";

const createStyleConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'style',
        dispatch: styleDispatch,
        View: Style,
        effectMap: styleEffect,
        extraState,
        extraDispatch
    })
}

export default createStyleConnected
