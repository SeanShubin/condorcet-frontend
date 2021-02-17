import './Tables.css'
import ErrorComponent from "../error/ErrorComponent";

const TableSelector = ({name, selectedName, selectedTableChanged}) => {
    const onClick = () => {
        selectedTableChanged(name)
    }
    let className
    if (selectedName === name) {
        className = 'tab selected'
    } else {
        className = 'tab'
    }
    return <label onClick={onClick} className={className}>{name}</label>
}

const TableSelectors = ({names, selectedName, selectedTableChanged}) => {
    return <div>
        {names.map(name => <TableSelector
            key={name}
            name={name}
            selectedName={selectedName}
            selectedTableChanged={selectedTableChanged}/>)}
    </div>
}

const TableHeader = ({header}) => <th>{header}</th>

const TableRow = ({row}) => <tr>{row.map(cell => <td>{cell}</td>)}</tr>

const TableContent = ({headers, rows}) => {
    return <table>
        <thead>
        <tr>{headers.map(header => <TableHeader header={header}/>)}</tr>
        </thead>
        <tbody>
        {rows.map(row => <TableRow row={row}/>)}
        </tbody>
    </table>
}

const Tables = ({selectedName, names, table, errors, selectedTableChanged}) => {
    return <div className={'Tables'}>
        <h1>Tables</h1>
        <ErrorComponent errors={errors}/>
        <TableSelectors names={names} selectedName={selectedName} selectedTableChanged={selectedTableChanged}/>
        <TableContent headers={table.columnNames} rows={table.rows}/>
        <a href={'/dashboard'}>dashboard</a>
    </div>
}

export default Tables
