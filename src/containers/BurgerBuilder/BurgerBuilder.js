import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        showOrderSummary: false,
        purchasing: false
    }

    showOrderHandler = () => {
        this.setState({
            showOrderSummary: true
        })
    }
    hideOrderHandler = () => {
        this.setState({
            showOrderSummary: false
        })
    }

    sleep= (ms)=>{
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    continueOrderHandler = () => {
        console.log('Starting order...')
        this.setState({
            purchasing: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dursun KOC',
                address: 'Umraniye/Istanbul',
                email: 'dk@dk.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(async response => {
                await this.sleep(2000);
                console.log(response)
                this.setState({
                    showOrderSummary: false, purchasing: false
                })
            }).catch(async error => {
                await this.sleep(2000);
                console.log(error)
                this.setState({
                    showOrderSummary: false, purchasing: false
                })
            })

    }

    updatePurchasable(updatedIngredients) {
        let sum = Object.values(updatedIngredients).reduce((acc, next) => acc + next)
        return sum > 0
    }


    disabledValidator = (type) => {
        return [this.state.ingredients[type] >= 3, this.state.ingredients[type] <= 0]
    }

    validateAmount = (amount) => amount <= 3 && amount >= 0

    updateIngredientHandlerGen = (operation) =>
        (type) => {
            return () => {
                let currentCount = this.state.ingredients[type]
                let updatedCount = operation(currentCount, 1)
                if (this.validateAmount(updatedCount)) {
                    const updatedIngredients = this.state.ingredients
                    let currentPrice = operation(this.state.totalPrice, PRICES[type])
                    updatedIngredients[type] = updatedCount
                    let purchasable = this.updatePurchasable(updatedIngredients)
                    this.setState({
                        ingredients: updatedIngredients,
                        totalPrice: currentPrice,
                        purchasable: purchasable
                    })
                }
            }
        }

    addIngredientHandlerGen = this.updateIngredientHandlerGen((a, b) => a + b)
    removeIngredientHandlerGen = this.updateIngredientHandlerGen((a, b) => a - b)



    render() {
        let modelContent = null
        if (this.state.purchasing) {
            modelContent = <Spinner />
        }
        if (this.state.showOrderSummary && !this.state.purchasing) {
            modelContent =
                <OrderSummary ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    cancelOrderHandler={this.hideOrderHandler}
                    continueOrderHandler={this.continueOrderHandler} />
        }

        return (
            <Aux>
                <Modal visible={this.state.showOrderSummary}
                    hideModal={this.hideOrderHandler}>
                    {modelContent}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    disabledValidator={this.disabledValidator}
                    addIngredientHandlerGen={this.addIngredientHandlerGen}
                    purchasable={this.state.purchasable}
                    removeIngredientHandlerGen={this.removeIngredientHandlerGen}
                    showOrderHandler={this.showOrderHandler}
                />
            </Aux>
        )
    }
}


export default BurgerBuilder