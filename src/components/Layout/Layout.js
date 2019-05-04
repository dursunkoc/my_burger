import React from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component{
    state = {
        showMenu: false
    }

    toogleMenu = () => {
        console.log('Toogle sidebar')
        this.setState((prevState)=>{
            return {showMenu: !prevState.showMenu}
        })
    }

    closeSideDrawer = () => {
        this.setState({
            showMenu: false
        })
    }

    openSideDrawer = () => {
        this.setState({
            showMenu: true
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toogleMenu={this.toogleMenu}/>
                <SideDrawer showMenu={this.state.showMenu}
                            close={this.closeSideDrawer}/>
                <main className={styles.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout