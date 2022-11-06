import {lensPathWithDefault} from '../library/lens-util';

const userModel = {
    originalName: lensPathWithDefault(['user', 'original', 'name'], ''),
    originalEmail: lensPathWithDefault(['user', 'original', 'email'], ''),
    editedName: lensPathWithDefault(['user', 'withEdits', 'name'], ''),
    editedEmail: lensPathWithDefault(['user', 'withEdits', 'email'],''),
    errors: lensPathWithDefault(['user', 'errors'], [])
}

export default userModel
