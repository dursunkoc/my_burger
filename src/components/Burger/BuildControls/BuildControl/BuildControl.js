import React from 'react';
import styles from './BuildControl.css'

const buildControl = (props) =>{
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button className={styles.Less} 
                    disabled={props.disabled[1]}
                    onClick={props.removeHandler}>Less</button>
            <button className={styles.More}
                    disabled={props.disabled[0]}
                    onClick={props.addHandler}>More</button>
        </div>
    )
}

export default buildControl;