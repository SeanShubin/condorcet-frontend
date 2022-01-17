import {lensPathWithDefault} from '../library/lens-util';

const navigationModel = {
    loginInformation: lensPathWithDefault(['navigation', 'loginInformation'], null),
    pageName: lensPathWithDefault(['navigation', 'pageName'], ''),
    errors: lensPathWithDefault(['navigation', 'errors'], [])
}

export default navigationModel
