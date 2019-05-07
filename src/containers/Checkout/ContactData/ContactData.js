import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import styles from './ContactData.css'
class ContactData extends Component {
    state = {
        contactData: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('ordering: ', this.props.ingredients)
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dursun KOC',
                address: 'Umraniye/Istanbul',
                email: 'dk@dk.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({
                    loading: false
                })
                console.log(this.props)
                this.props.history.push({ pathname: '/' });
            }).catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        let contactDataForm = (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Your name' />
                    <input className={styles.Input} type='text' name='email' placeholder='Your Email' />
                    <input className={styles.Input} type='text' name='street' placeholder='Street' />
                    <input className={styles.Input} type='text' name='postalCode' placeholder='Postal Code' />
                    <Button btnType='Positive' onClick={this.orderHandler}>Order</Button>
                </form>
            </div>
        )
        if (this.state.loading) {
            contactDataForm = <Spinner />
        }

        return contactDataForm;
    }
}

export default ContactData;