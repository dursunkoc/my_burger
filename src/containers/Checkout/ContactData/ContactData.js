import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import styles from './ContactData.css'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: { elementType: 'input', elementConfig: { type: 'text', placeholder: 'Your Name' }, value: '', touched:false, valid:false, validation:{required:true} },
            email: { elementType: 'input', elementConfig: { type: 'email', placeholder: 'Your Email' }, value: '', touched:false, valid:false, validation:{minLength: 4, maxLength:14} },
            street: { elementType: 'input', elementConfig: { type: 'text', placeholder: 'Street' }, value: '', touched:false, valid:false, validation:{} },
            postalCode: { elementType: 'input', elementConfig: { type: 'text', placeholder: 'ZIP Code' }, value: '', touched:false, valid:false, validation:{minLength: 4, maxLength:6} },
            country: { elementType: 'input', elementConfig: { type: 'text', placeholder: 'Country' }, value: '', touched:false, valid:false, validation:{} },
            deliveryMethod: { elementType: 'select', elementConfig: { options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }] }, value: '', touched:false, valid:false, validation:{} }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('ordering: ', this.props.ingredients)
        this.setState({
            loading: true
        })
        let orderForm = this.state.orderForm
        let orderData = Object.keys(orderForm).reduce((agg, next)=>{
            agg[next]=orderForm[next].value
            return agg
        }, {})
        console.log(orderData)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderData
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

    validate=(value, validation)=>{
        let isValid = true;
        if(validation.required){
            isValid = (value.trim() !== '') && isValid
        }
        if(validation.minLength){
            isValid = (value.length > validation.minLength) && isValid
        }
        if(validation.maxLength){
            isValid = (value.length < validation.maxLength) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (formId) => {
        return (event) => {
            const orderForm = {...this.state.orderForm}
            const orderFormElement = {...orderForm[formId]}
            orderFormElement.value = event.target.value
            orderFormElement.valid = this.validate(orderFormElement.value, orderFormElement.validation)
            orderFormElement.touched = true
            orderForm[formId] = orderFormElement
            this.setState({orderForm:orderForm})
            console.log(orderForm)
        }
    }

    render() {

        let formElements = Object.keys(this.state.orderForm).map((ik) => {
            return { id: ik, config: this.state.orderForm[ik] }
        }).map(fe => <Input key={fe.id}
            elementType={fe.config.elementType}
            elementConfig={fe.config.elementConfig}
            value={fe.config.value}
            valid={fe.config.valid}
            touched={fe.config.touched}
            changed={this.inputChangedHandler(fe.id)} />)

        let contactDataForm = (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElements}
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