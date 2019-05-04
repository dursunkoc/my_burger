import React from 'react'
import styles from './Toolbar.css'
import Logo from '../../Logo/Logo'
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props)=>{
    return (
        <div className={[styles.Toolbar].join(' ')}>
            <DrawerToogle onClick={props.toogleMenu} />
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default toolbar