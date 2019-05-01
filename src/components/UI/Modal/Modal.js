import React from 'react'
import styles from './Modal.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Aux>
            <div style={{
                transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.visible ? '1' : '0'
            }} className={styles.Modal}>
                {props.children}
            </div>
            <Backdrop show={props.visible} onClick={props.hideModal}/>
        </Aux>
    )
}

export default modal