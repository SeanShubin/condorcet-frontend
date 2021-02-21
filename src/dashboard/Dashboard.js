import './Dashboard.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";

const Dashboard = ({errors, navigate, logoutRequest}) => {
    const onClickManageUsers = event => {
        event.preventDefault()
        navigate('/manageUsers')
    }
    const onClickTables = event => {
        event.preventDefault()
        navigate('/tables')
    }
    const onClickEvents = event => {
        event.preventDefault()
        navigate('/events')
    }
    return <div className={'Dashboard'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <a onClick={onClickManageUsers}>manage users</a>
        <a onClick={onClickTables}>tables</a>
        <a onClick={onClickEvents}>events</a>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
