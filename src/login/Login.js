import React from 'react';
import './Login.css'
import ErrorComponent from "../error/ErrorComponent";

const Login = ({nameOrEmail, password, errors, nameOrEmailChanged, passwordChanged, loginRequest}) => {
    const onChangeNameOrEmail = event =>
        nameOrEmailChanged(event.target.value)
    const onChangePassword = event =>
        passwordChanged(event.target.value)
    const onClickLoginRequest = () => {
        loginRequest({nameOrEmail, password})
    }
    return <div className={'Login'}>
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
        <button type={'button'} onClick={onClickLoginRequest}>Login</button>
        <a href={'/register'}>Register</a>
    </div>
}

export default Login
