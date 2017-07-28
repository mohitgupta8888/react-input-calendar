import React from 'react'

export default function ViewHeader({ prev, next, titleAction, data }) {
    return (
        <div className="navigation-wrapper">
            <i className="icon icon-arrow-right3" onClick={prev} />
            <span className="navigation-title" onClick={titleAction} >{data}</span>
            <i className="icon icon-arrow-left3" onClick={next} />
        </div>
    )
}
