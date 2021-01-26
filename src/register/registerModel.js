import {lensPathWithDefault} from '../library/lens-util';

const registerModel = {
    name: lensPathWithDefault(['register', 'name'], ''),
    email: lensPathWithDefault(['register', 'email'], ''),
    password: lensPathWithDefault(['register', 'password'], ''),
    confirmationPassword: lensPathWithDefault(['register', 'confirmationPassword'], ''),
    errors: lensPathWithDefault(['register', 'errors'], [])
}

export default registerModel
