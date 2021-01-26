import {lensPathWithDefault} from '../library/lens-util';

const loginModel = {
    nameOrEmail: lensPathWithDefault(['login', 'nameOrEmail'], ''),
    password: lensPathWithDefault(['login', 'password'], ''),
    errors: lensPathWithDefault(['login', 'errors'], [])
}

export default loginModel
