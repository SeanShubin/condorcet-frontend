import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import {loginPagePath} from "../login/loginConstant";

const Register = (
    {
        userName,
        email,
        password,
        confirmationPassword,
        errors,
        nameChanged,
        emailChanged,
        passwordChanged,
        confirmationPasswordChanged,
        passwordDoesNotMatchConfirmationPassword,
        registerRequest
    }) => {
    const onChangeName = event =>{
        nameChanged(event.target.value)
    }
    const onChangeEmail = event =>
        emailChanged(event.target.value)
    const onChangePassword = event =>
        passwordChanged(event.target.value)
    const onChangeConfirmationPassword = event =>
        confirmationPasswordChanged(event.target.value)
    const onSubmit = event => {
        event.preventDefault()
        if (password === confirmationPassword) {
            registerRequest({userName, email, password})
        } else {
            passwordDoesNotMatchConfirmationPassword({password, confirmationPassword})
        }
    }
    return <form className={'Register columns-1-outer'} onSubmit={onSubmit}>
        <h1>Register</h1>
        <ErrorComponent errors={errors}/>
        <input value={userName}
               autoFocus={true}
               placeholder={'name'}
               onChange={onChangeName}/>
        <input value={email}
               placeholder={'email'}
               onChange={onChangeEmail}/>
        <input value={password}
               type={'password'}
               placeholder={'password'}
               onChange={onChangePassword}/>
        <input value={confirmationPassword}
               type={'password'}
               placeholder={'confirmation password'}
               onChange={onChangeConfirmationPassword}/>
        <button type={'submit'}>Register</button>
        <hr/>
        <a href={loginPagePath}>Login</a>
    </form>
}

export default Register
