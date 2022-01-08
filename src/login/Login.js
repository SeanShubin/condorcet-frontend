import React from 'react';
import './Login.css'
import ErrorComponent from "../error/ErrorComponent";

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
    return <form className={'Login'} onSubmit={onSubmit}>
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
        <a href={'/register'}>Register</a>
        <a href={'/style'}>Style</a>
    </form>
}

export default Login
