import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'

class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 0,
    //         meat: 0,
    //         bacon: 0,
    //         cheese: 0
    //     },
    //     totalPrice: 0.0
    // }

    componentDidMount() {
        // const query = new URLSearchParams(this.props.location.search)
        // let ingredients = { ...this.state.ingredients }
        // let totalPrice = 0.0
        // for (let q of query.entries()) {
        //     if(q[0] === 'totalPrice'){
        //         totalPrice = parseFloat(q[1])
        //     }else{
        //         ingredients[q[0]] = parseInt(q[1])
        //     }
        // }
        // this.setState({
        //     ingredients: ingredients,
        //     totalPrice: totalPrice
        // })
    }

    cancelCheckout = () => {
        console.log('[Checkout.cancelCheckout]', this.props)
        this.props.history.goBack();
    }

    continueCheckout = () => {
        console.log('[Checkout.continueCheckout]', this.props)
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        console.log('[Checkout.render]', this.props)
        return (
            <Aux>
                <CheckoutSummary ingredients={this.props.ingredients}
                    cancelCheckout={this.cancelCheckout}
                    continueCheckout={this.continueCheckout} />
                <Route path={this.props.match.path + '/contact-data'} component={(props) => 
                    <ContactData 
                        ingredients={this.props.ingredients} 
                        totalPrice={this.props.totalPrice}
                        {...props}/>} />
            </Aux>
        );
    }
}

const s2p = (state) =>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(s2p)(Checkout);