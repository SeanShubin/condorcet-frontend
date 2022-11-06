import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {Link} from "../library/uri-util";
import {dashboardPagePath} from "../dashboard/dashboardConstant";
import {usersPagePath} from "../users/usersConstant";
import * as R from 'ramda'

const composeUpdates = ({originalName, editedName, originalEmail, editedEmail}) => {
    let nameUpdate
    if(originalName === editedName){
        nameUpdate = {}
    } else {
        nameUpdate = {name: editedName}
    }

    let emailUpdate
    if(originalEmail === editedEmail){
        emailUpdate = {}
    } else {
        emailUpdate = {email: editedEmail}
    }

    return R.mergeAll([nameUpdate, emailUpdate])
}

const User = props => {
    const {
        originalName,
        editedName,
        originalEmail,
        editedEmail,
        errors,
        nameChanged,
        emailChanged,
        updateUserRequest,
        globalSetUri
    } = props
    const submitEnabledRules = () => {
        if(editedName !== originalName) return true
        if(editedEmail !== originalEmail) return true
        return false
    }
    const submitEnabled = submitEnabledRules()
    const onChangeName = event =>
        nameChanged(event.target.value)
    const onChangeEmail = event =>
        emailChanged(event.target.value)
    const onSubmit = event => {
        event.preventDefault()
        const updates = composeUpdates({
            originalName, editedName, originalEmail, editedEmail
        })
        updateUserRequest({name:originalName, updates})
    }
    return <form className={'User columns-1-outer'} onSubmit={onSubmit}>
        <h1>User</h1>
        <ErrorComponent errors={errors}/>
        <input value={editedName}
               placeholder={'name'}
               onChange={onChangeName}/>
        <input value={editedEmail}
               placeholder={'email'}
               onChange={onChangeEmail}/>
        <button type={'submit'} disabled={!submitEnabled}>Update User</button>
        <hr/>
        <Link href={usersPagePath} setUri={globalSetUri}>users</Link>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </form>
}

export default User
