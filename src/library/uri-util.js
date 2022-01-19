import React from "react";

const Link = ({setUri, href, children}) => {
    const onClick = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        setUri(uri)
    }
    return <a href={href} onClick={onClick}>{children}</a>
}

export {Link}
