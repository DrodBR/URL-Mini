import React, { useEffect } from 'react'

const Title = (props) => {

    useEffect(() => {
        const titlePrefix = "Daniel R. | "
        document.title = titlePrefix + props.title
    }, [])

    return (
        <div>
        </div>)
}
export default Title