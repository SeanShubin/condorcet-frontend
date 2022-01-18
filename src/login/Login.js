import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {registerPagePath} from "../register/registerConstant";
import {stylePagePath} from "../style/styleConstant";

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
    const onClickAnchor = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        globalSetUri(uri)
    }
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
        <a href={registerPagePath} onClick={onClickAnchor}>Register</a>
        <a href={stylePagePath} onClick={onClickAnchor}>Style</a>
    </form>
}

export default Login
