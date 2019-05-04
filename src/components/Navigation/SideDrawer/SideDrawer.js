import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import styles from "./SideDrawer.css";

const sideDrawer = (props) => {
    console.log('[Sidedrawer]', props)
    let showBackdrop = false
    let openClosedStyle = styles.Close
    if(props.showMenu){
        showBackdrop = true
        openClosedStyle = styles.Open
    }
    return (
        <Aux>
            <Backdrop show={showBackdrop} onClick={props.close}/>
            <div className={[styles.SideDrawer, openClosedStyle].join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav><NavigationItems /></nav>
            </div>
        </Aux>);
}

export default sideDrawer;