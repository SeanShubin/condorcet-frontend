import {lensPathWithDefault} from '../library/lens-util';

const navigationModel = {
    userName: lensPathWithDefault(['navigation', 'userName'], null),
    role: lensPathWithDefault(['navigation', 'role'], null),
    pageName: lensPathWithDefault(['navigation', 'pageName'], ''),
    errors: lensPathWithDefault(['navigation', 'errors'], [])
}

export default navigationModel
