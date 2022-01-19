import React from "react";
import * as R from 'ramda'

const Link = args => {
    const {setUri, href, children} = args
    const otherArgs = R.omit(['setUri', 'href', 'children'], args)
    const onClick = event => {
        event.preventDefault()
        const target = event.target
        const origin = target.origin
        const href = target.href
        const uri = href.substring(origin.length)
        setUri(uri)
    }
    return <a {...otherArgs} href={href} onClick={onClick} >{children}</a>
}

export {Link}
