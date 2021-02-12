import './Admin.css'
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'

const createHeaderCell = caption => <th key={caption}>{caption}</th>

const createHeaderRow = captions => {
    const headerCells = R.map(createHeaderCell, captions)
    return <tr>{headerCells}</tr>
}

const createBodyRow = user => <tr key={user.name}>
    <td>{user.name}</td>
    <td>{user.role}</td>
</tr>

const createBodyRows = users => R.map(createBodyRow, users)

const UserList = ({users}) => {
    const headerRow = createHeaderRow(['name', 'role'])
    const bodyRows = createBodyRows(users)
    return <table>
        <thead>
        {headerRow}
        </thead>
        <tbody>
        {bodyRows}
        </tbody>
    </table>
}

const Admin = ({users, errors}) => {
    return <div className={'Admin'}>
        <h1>Admin</h1>
        <ErrorComponent errors={errors}/>
        <UserList users={users}/>
        <a href={'/dashboard'}>dashboard</a>
    </div>
}

export default Admin
