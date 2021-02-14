import './Admin.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

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
            name: user.name,
            role: event.target.value
        })
    }

    return <tr key={user.name}>
        <td><span>{user.name}</span></td>
        <td>
            <select value={user.role} onChange={onChange}>
                {R.map(role => <RoleOption key={role} role={role}/>, user.allowedRoles)}
            </select>
        </td>
    </tr>
}

const BodyRows = ({users, updateUserRoleRequest}) =>
    R.map(user => <BodyRow key={user.name} user={user} updateUserRoleRequest={updateUserRoleRequest}/>, users)

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

const Admin = ({users, errors, updateUserRoleRequest}) => {
    return <div className={'Admin'}>
        <h1>Admin</h1>
        <ErrorComponent errors={errors}/>
        <UserList users={users} updateUserRoleRequest={updateUserRoleRequest}/>
        <a href={'/dashboard'}>dashboard</a>
    </div>
}

export default Admin
