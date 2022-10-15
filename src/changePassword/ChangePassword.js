import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {loginPagePath} from "../login/loginConstant";
import {Link} from "../library/uri-util";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const ChangePassword = (
    {
        password,
        confirmationPassword,
        errors,
        passwordChanged,
        confirmationPasswordChanged,
        passwordDoesNotMatchConfirmationPassword,
        changePasswordRequest,
        globalSetUri
    }) => {
    const onChangePassword = event =>
        passwordChanged(event.target.value)
    const onChangeConfirmationPassword = event =>
        confirmationPasswordChanged(event.target.value)
    const onSubmit = event => {
        event.preventDefault()
        if (password === confirmationPassword) {
            changePasswordRequest(password)
        } else {
            passwordDoesNotMatchConfirmationPassword({password, confirmationPassword})
        }
    }
    return <form className={'ChangePassword columns-1-outer'} onSubmit={onSubmit}>
        <h1>ChangePassword</h1>
        <ErrorComponent errors={errors}/>
        <input value={password}
               type={'password'}
               placeholder={'password'}
               onChange={onChangePassword}/>
        <input value={confirmationPassword}
               type={'password'}
               placeholder={'confirmation password'}
               onChange={onChangeConfirmationPassword}/>
        <button type={'submit'}>Change Password</button>
        <hr/>
        <Link href={dashboardPagePath} setUri={globalSetUri}>dashboard</Link>
    </form>
}

export default ChangePassword
