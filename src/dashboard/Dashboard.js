import './Dashboard.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";

const Dashboard = ({errors, logoutRequest}) => {
    return <div className={'Dashboard'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <a href={'/admin'}>admin</a>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
