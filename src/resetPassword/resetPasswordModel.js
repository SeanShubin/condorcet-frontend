import {lensPathWithDefault} from '../library/lens-util';

const resetPasswordModel = {
    message: lensPathWithDefault(['resetPassword', 'message'], ''),
    email: lensPathWithDefault(['resetPassword', 'email'], ''),
    errors: lensPathWithDefault(['resetPassword', 'errors'], [])
}

export default resetPasswordModel
