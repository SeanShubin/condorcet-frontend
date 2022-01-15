import registerDispatch from './registerDispatch'
import registerEvent from './registerEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const invokeApi = async (name, parameters) => {
    const result = await fetch(
        `/proxy/${name}`,
        {
            method: 'POST',
            body: JSON.stringify(parameters)
        }
    )
    if(result.ok){
        await result.json()
    } else {
        const resultJson = await result.json()
        throw Error(resultJson.userSafeMessage)
    }
}

const register = async ({userName, email, password}) => {
    return invokeApi('Register',{userName, email, password})
}

const handleError = environment => function* (f){
    yield put(registerDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(registerDispatch.errorAdded(ex.message))
    }
}

const registerRequest = environment => function* (event) {
    yield* handleError(environment)(function*() {
        const {userName, email, password} = event
        yield register({userName, email, password})
        yield put(navigationDispatch.redirect(dashboardPagePath))
    })
}

const registerEffect = {
    [registerEvent.REGISTER_REQUEST]: registerRequest
}

export default registerEffect
