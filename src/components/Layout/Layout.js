import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={styles.Container}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout