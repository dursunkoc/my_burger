import React, { Component } from 'react';
import styles from './Orders.css';
import Order from '../../components/Burger/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            console.log(response.data)
            let orders = Object.keys(response.data).map(k => { return { ...response.data[k], id: k } })

            console.log(orders)
            this.setState({
                orders: orders,
                loading: false
            })
        })
    }

    render() {
        let orders;
        if (this.state.loading) {
            orders = <Spinner />
        } else {
            orders = this.state.orders.map(o => <Order ingredients={o.ingredients} totalPrice={o.price} key={o.id} />)
        }
        return (
            <div className={styles.Orders}>
                {orders}
            </div>
        );
    }
}

export default Orders;