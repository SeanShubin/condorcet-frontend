import './Tables.css'
import ErrorComponent from "../error/ErrorComponent";
import {tablesPagePath} from "./tablesConstant";

const TableSelector = ({name, selectedName, setUri}) => {
    const onClick = () => {
        setUri(tablesPagePath(name))
    }
    let className
    if (selectedName === name) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <label onClick={onClick} className={className}>{name}</label>
}

const TableSelectors = ({names, selectedName, setUri}) => {
    return <div>
        {names.map(name => <TableSelector
            key={name}
            name={name}
            selectedName={selectedName}
            setUri={setUri}/>)}
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

const Tables = ({selectedName, names, table, errors, setUri}) => {
    const onClickDashboard = event => {
        event.preventDefault()
        setUri('/dashboard')
    }
    return <div className={'Tables'}>
        <h1>Tables</h1>
        <ErrorComponent errors={errors}/>
        <a onClick={onClickDashboard}>dashboard</a>
        <TableSelectors names={names} selectedName={selectedName} setUri={setUri}/>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <a onClick={onClickDashboard}>dashboard</a>
    </div>
}

export default Tables
