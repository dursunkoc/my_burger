import React from 'react';
import styles from './DrawerToogle.css'

const DrawerToogle = (props) => {
    return ( 
    <div className={styles.DrawerToogle} onClick={props.onClick}>
    <div></div>
    <div></div>
    <div></div>
    </div> );
}
 
export default DrawerToogle;