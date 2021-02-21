import './Tables.css'
import ErrorComponent from "../error/ErrorComponent";
import {tablesPagePath} from "./tablesConstant";

const TableSelector = ({name, selectedName, navigate}) => {
    const onClick = () => {
        navigate(tablesPagePath(name))
    }
    let className
    if (selectedName === name) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <label onClick={onClick} className={className}>{name}</label>
}

const TableSelectors = ({names, selectedName, navigate}) => {
    return <div>
        {names.map(name => <TableSelector
            key={name}
            name={name}
            selectedName={selectedName}
            navigate={navigate}/>)}
    </div>
}

const TableHeader = ({header}) => <th>{header}</th>

const TableRow = ({row}) => <tr>{row.map((cell, index) => <td key={index}>{`${cell}`}</td>)}</tr>

const TableContent = ({headers, rows}) => {
    return <table>
        <thead>
        <tr>{headers.map((header, index) => <TableHeader key={index} header={header}/>)}</tr>
        </thead>
        <tbody>
        {rows.map((row, index) => <TableRow key={index} row={row}/>)}
        </tbody>
    </table>
}

const Tables = ({selectedName, names, table, errors, navigate}) => {
    const onClickDashboard = event => {
        event.preventDefault()
        navigate('/dashboard')
    }
    return <div className={'Tables'}>
        <h1>Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors names={names} selectedName={selectedName} navigate={navigate}/>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Tables
