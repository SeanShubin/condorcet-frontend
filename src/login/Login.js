import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {registerPagePath} from "../register/registerConstant";
import {stylePagePath} from "../style/styleConstant";
import {resetPasswordPagePath} from "../resetPassword/resetPasswordConstant";
import {Link} from "../library/uri-util";

const Login = (
    {
        nameOrEmail,
        password,
        errors,
        nameOrEmailChanged,
        passwordChanged,
        loginRequest,
        globalSetUri
    }) => {
    const onChangeNameOrEmail = event =>
        nameOrEmailChanged(event.target.value)
    const onChangePassword = event =>
        passwordChanged(event.target.value)
    const onSubmit = event => {
        event.preventDefault()
        loginRequest({nameOrEmail, password})
    }
    return <form className={'Login columns-1-outer'} onSubmit={onSubmit}>
        <h1>Login</h1>
        <ErrorComponent errors={errors}/>
        <input value={nameOrEmail}
               autoFocus={true}
               placeholder={'user name or email'}
               onChange={onChangeNameOrEmail}/>
        <input value={password}
               type={'password'}
               placeholder={'password'}
               onChange={onChangePassword}/>
        <button type={'submit'}>Login</button>
        <hr/>
        <Link href={registerPagePath} setUri={globalSetUri}>Register</Link>
        <Link href={resetPasswordPagePath} setUri={globalSetUri}>Reset Password</Link>
        <Link href={stylePagePath} setUri={globalSetUri}>Style</Link>
    </form>
}

export default Login
