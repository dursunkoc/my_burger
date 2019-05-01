import React from 'react'
import styles from './Button.css'

const button = (props)=>{
    return (
        <button className={[styles.Button, styles[props.btnType]].join(' ')}
                onClick={props.onClick}>
                {props.children}
        </button>
    )
}

export default button