import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {loginPagePath} from "../login/loginConstant";
import {Link} from "../library/uri-util";

const ResetPassword = (
    {
        message,
        email,
        emailChanged,
        resetPasswordRequest,
        errors,
        globalSetUri
    }) => {
    const onEmailChanged = event =>
        emailChanged(event.target.value)
    const onSubmit = event => {
        event.preventDefault()
        resetPasswordRequest(email)
    }
    return <form className={'ResetPassword columns-1-outer'} onSubmit={onSubmit}>
        <h1>ResetPassword</h1>
        <ErrorComponent errors={errors}/>
        <p>{message}</p>
        <input value={email}
               placeholder={'email'}
               onChange={onEmailChanged}/>
        <button type={'submit'}>Reset Password</button>
        <hr/>
        <Link href={loginPagePath} setUri={globalSetUri}>Login</Link>
    </form>
}

export default ResetPassword
