import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

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
        showOrderSummary: false
    }

    showOrderHandler = () => {
        this.setState({
            showOrderSummary: true
        })
    }
    hideOrderHandler = ()=>{
        this.setState({
            showOrderSummary: false
        })
    }

    continueOrderHandler = ()=>{
        this.setState({
            showOrderSummary: false
        })
        console.log('Starting order...')
        alert('Starting order...')
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
        return (
            <Aux>
                <Modal visible={this.state.showOrderSummary}
                       hideModal={this.hideOrderHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  totalPrice={this.state.totalPrice}
                                  cancelOrderHandler={this.hideOrderHandler}
                                  continueOrderHandler={this.continueOrderHandler}/>
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