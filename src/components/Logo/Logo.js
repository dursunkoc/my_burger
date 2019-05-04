import React from 'react'
import burgerLogo from '../../assets/images/logo.png'
import styles from './Logo.css'

const logo = (props) => {
    return (
        <div className={styles.Logo} onClick={props.clicked}>
            <img src={burgerLogo} alt='MyBurger' onClick={props.clicked}/>
        </div>
    )
}

export default logo