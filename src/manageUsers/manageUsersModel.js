import {lensPathWithDefault} from '../library/lens-util';

const manageUsersModel = {
    users: lensPathWithDefault(['manageUsers', 'users'], []),
    errors: lensPathWithDefault(['manageUsers', 'errors'], [])
}

export default manageUsersModel
