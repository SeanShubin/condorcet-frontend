import {lensPathWithDefault} from '../library/lens-util';

const navigationModel = {
    page: lensPathWithDefault(['navigation', 'page'], ''),
    errors: lensPathWithDefault(['navigation', 'errors'], [])
}

export default navigationModel
