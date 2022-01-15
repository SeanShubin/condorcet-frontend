import './ManageUsers.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const HeaderCell = ({caption}) => <th key={caption}><span>{caption}</span></th>

const HeaderRow = ({captions}) => {
    const headerCells = R.map(caption => <HeaderCell key={caption} caption={caption}/>, captions)
    return <tr>{headerCells}</tr>
}

const BodyRow = ({user, updateUserRoleRequest}) => {
    const RoleOption = ({role}) => {
        return <option key={role}>{role}</option>
    }

    const onChange = event => {
        updateUserRoleRequest({
            userName: user.userName,
            role: event.target.value
        })
    }

    return <tr key={user.userName}>
        <td><span>{user.userName}</span></td>
        <td>
            <select value={user.role} onChange={onChange}>
                {R.map(role => <RoleOption key={role} role={role}/>, user.allowedRoles)}
            </select>
        </td>
    </tr>
}

const BodyRows = ({users, updateUserRoleRequest}) => {
    const createBodyRow = user => {
        return <BodyRow key={user.userName}
                        user={user}
                        updateUserRoleRequest={updateUserRoleRequest}/>
    }
    return R.map(createBodyRow, users)
}

const UserList = ({users, updateUserRoleRequest}) => {
    const captions = ['name', 'role']
    return <table>
        <thead>
        <HeaderRow captions={captions}/>
        </thead>
        <tbody>
        <BodyRows users={users} updateUserRoleRequest={updateUserRoleRequest}/>
        </tbody>
    </table>
}

const ManageUsers = ({users, errors, updateUserRoleRequest}) => {
    return <div className={'ManageUsers'}>
        <h1>ManageUsers</h1>
        <ErrorComponent errors={errors}/>
        <UserList users={users} updateUserRoleRequest={updateUserRoleRequest}/>
        <hr/>
        <a href={dashboardPagePath}>dashboard</a>
    </div>
}

export default ManageUsers
