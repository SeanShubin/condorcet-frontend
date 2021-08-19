import {createConnected} from '../library/connected-util'
import Style from "./Style";

const createStyleConnected = ({extraState = {}, extraDispatch = {}}) => {
    return createConnected({
        name: 'style',
        View: Style,
        extraState,
        extraDispatch
    })
}

export default createStyleConnected
