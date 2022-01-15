import {lensPathWithDefault} from '../library/lens-util';

const registerModel = {
    userName: lensPathWithDefault(['register', 'userName'], ''),
    email: lensPathWithDefault(['register', 'email'], ''),
    password: lensPathWithDefault(['register', 'password'], ''),
    confirmationPassword: lensPathWithDefault(['register', 'confirmationPassword'], ''),
    errors: lensPathWithDefault(['register', 'errors'], [])
}

export default registerModel
