import * as R from 'ramda'

const lensPathWithDefault = (lensPath, theDefault) => {
    const theLens = R.lensPath(lensPath)
    const getter = R.pipe(R.view(theLens), R.defaultTo(theDefault))
    const setter = R.set(theLens)
    return R.lens(getter, setter)
}

export {lensPathWithDefault}
