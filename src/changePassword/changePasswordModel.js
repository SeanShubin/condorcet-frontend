import {lensPathWithDefault} from '../library/lens-util';

const changePasswordModel = {
    password: lensPathWithDefault(['changePassword', 'password'], ''),
    confirmationPassword: lensPathWithDefault(['changePassword', 'confirmationPassword'], ''),
    errors: lensPathWithDefault(['changePassword', 'errors'], [])
}

export default changePasswordModel
