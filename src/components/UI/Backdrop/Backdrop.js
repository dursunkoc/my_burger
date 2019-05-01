import React from 'react'
import styles from './Backdrop.css'

const backdrop = (props)=>{
    return props.show ?
    (<div className={styles.Backdrop} onClick={props.onClick}/>): null
}

export default backdrop