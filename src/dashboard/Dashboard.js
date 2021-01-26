import './Dashboard.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";

const Dashboard = ({name, errors, logoutRequest}) => {
    return <div className={'Dashboard'}>
        <h1>Dashboard</h1>
        <ErrorComponent errors={errors}/>
        <p>Hello, {name}</p>
        <button type={'button'} onClick={logoutRequest}>Logout</button>
    </div>
}

export default Dashboard
