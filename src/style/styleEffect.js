import styleEvent from './styleEvent'

const initialize = environment => function* (event) {
    yield
}

const styleEffect = {
    [styleEvent.INITIALIZE]: initialize
}

export default styleEffect
