import React from 'react';
import styles from './NavigationItem.css'
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => {
    let classes = [styles.NavigationItem, props.active? styles.active:null].join(' ')
    return (
        <li className={classes}>
            <NavLink exact to={props.link} activeClassName={styles.active}>{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;