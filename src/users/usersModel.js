import {lensPathWithDefault} from '../library/lens-util';

const usersModel = {
    users: lensPathWithDefault(['users', 'users'], []),
    errors: lensPathWithDefault(['users', 'errors'], [])
}

export default usersModel
