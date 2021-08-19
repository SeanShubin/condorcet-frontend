import React from 'react';
import './Login.css'
import ErrorComponent from "../error/ErrorComponent";

const Login = ({nameOrEmail, password, errors, setUri, nameOrEmailChanged, passwordChanged, loginRequest}) => {
    const onClickRegister = event => {
        event.preventDefault()
        setUri('/register')
    }
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
        <a onClick={onClickRegister}>Register</a>
        <a href={'/style'}>Style</a>
    </form>
}

export default Login
