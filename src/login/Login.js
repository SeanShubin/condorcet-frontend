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
        loginRequest
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
        <a href={registerPagePath}>Register</a>
        <a href={stylePagePath}>Style</a>
    </form>
}

export default Login
