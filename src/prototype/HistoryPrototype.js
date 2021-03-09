import './HistoryPrototype.css'
import {useEffect, useState} from "react";
import * as R from 'ramda'

const HistoryElement = ({name, readFromLocation, writeToLocation}) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        setValue(readFromLocation(window.location))
    }, [])
    const onInputChange = event => {
        setValue(event.target.value)
    }
    const onButtonClick = () => {
        writeToLocation(window.location, value)
    }

    return <>
        <span>{name}</span>
        <input onChange={onInputChange} value={value}></input>
        <button onClick={onButtonClick}>set</button>
    </>
}

const hrefElement = {
    name: 'href',
    readFromLocation: location => location.href,
    writeToLocation: (location, value) => location.href = value
}

const originElement = {
    name: 'origin',
    readFromLocation: location => location.origin,
    writeToLocation: (location, value) => location.origin = value
}

const protocolElement = {
    name: 'scheme',
    readFromLocation: location => location.protocol,
    writeToLocation: (location, value) => location.protocol = value
}

const hostElement = {
    name: 'host',
    readFromLocation: location => location.host,
    writeToLocation: (location, value) => location.host = value
}

const hostnameElement = {
    name: 'hostname',
    readFromLocation: location => location.hostname,
    writeToLocation: (location, value) => location.hostname = value
}

const portElement = {
    name: 'port',
    readFromLocation: location => location.port,
    writeToLocation: (location, value) => location.port = value
}

const pathnameElement = {
    name: 'pathname',
    readFromLocation: location => location.pathname,
    writeToLocation: (location, value) => location.pathname = value
}

const searchElement = {
    name: 'search',
    readFromLocation: location => location.search,
    writeToLocation: (location, value) => location.search = value
}

const hashElement = {
    name: 'hash',
    readFromLocation: location => location.hash,
    writeToLocation: (location, value) => location.hash = value
}

const elements = [
    // hrefElement,
    // originElement,
    protocolElement,
    // hostElement,
    hostnameElement,
    portElement,
    pathnameElement,
    searchElement,
    hashElement
]

const HistoryPrototype = () => {
    return <div className={'HistoryPrototype'}>
        {R.chain(element => <HistoryElement {...element}/>, elements)}
    </div>
}

export default HistoryPrototype
