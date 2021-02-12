import {lensPathWithDefault} from '../library/lens-util';

const adminModel = {
    users: lensPathWithDefault(['admin', 'users'], []),
    errors: lensPathWithDefault(['admin', 'errors'], [])
}

export default adminModel
