import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../../containers/Checkout/Checkout'
import Orders from '../../containers/Orders/Orders';


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
                    <Switch>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route exact path='/' component={BurgerBuilder}/>
                    </Switch>
                </main>
            </Aux>
        )
    }
}

export default Layout