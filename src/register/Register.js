import './Register.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";

const Register = (
    {
        name,
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
    const onChangeName = event =>
        nameChanged(event.target.value)
    const onChangeEmail = event =>
        emailChanged(event.target.value)
    const onChangePassword = event =>
        passwordChanged(event.target.value)
    const onChangeConfirmationPassword = event =>
        confirmationPasswordChanged(event.target.value)
    const onClickRegister = () => {
        if (password === confirmationPassword) {
            registerRequest({name, email, password})
        } else {
            passwordDoesNotMatchConfirmationPassword({password, confirmationPassword})
        }
    }
    return <div className={'Register'}>
        <h1>Register</h1>
        <ErrorComponent errors={errors}/>
        <input value={name}
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
        <button type={'button'} onClick={onClickRegister}>Register</button>
        <a href={'/login'}>Login</a>
    </div>
}

export default Register
