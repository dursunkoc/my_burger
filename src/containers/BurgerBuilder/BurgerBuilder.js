import React from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler'
import Button from '../../components/UI/Button/Button'

const PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        ingredientsUrl: 'https://burger-builder-dk.firebaseio.com/ingredients',
        totalPrice: 4,
        purchasable: false,
        showOrderSummary: false,
        purchasing: false,
        loaded: false,
        error: null
    }

    componentDidMount() {
        axios.get(this.state.ingredientsUrl)
            .then(async (response) => {
                // await this.sleep(30000)
                this.setState({
                    ingredients: response.data,
                    loaded: true
                })
            }).catch(error => {
                this.setState({
                    error: error,
                    loaded: false
                })
            })
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

    sleep = (ms) => {
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

    retryLoading = ()=>{
        console.log('Retrying load...')
        this.setState({error:null})
        axios.get(this.state.ingredientsUrl+'.json')
        .then(async (response) => {
            await this.sleep(3000)
            console.log('Loaded...')
            this.setState({
                ingredients: response.data,
                loaded: true
            })
        }).catch(error => {
            console.log('Error Again...')
            this.setState({
                error: error,
                loaded: false
            })
        })
    }

    render() {
        let modelContent = null
        let burgerBody = <Spinner style={{ margin: 30 }} />
        
        if (this.state.error) {
            burgerBody = <p style={{ textAlign: 'center', color: 'red' }}>Something went wrong!<br />Unable to load data!<br />
            <Button btnType='Positive' onClick={this.retryLoading}>Retry</Button></p>
        }

        if (this.state.loaded) {
            burgerBody = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        disabledValidator={this.disabledValidator}
                        addIngredientHandlerGen={this.addIngredientHandlerGen}
                        purchasable={this.state.purchasable}
                        removeIngredientHandlerGen={this.removeIngredientHandlerGen}
                        showOrderHandler={this.showOrderHandler}
                    />
                </Aux>)
        }
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
                {burgerBody}
            </Aux>
        )
    }
}


export default WithErrorHandler(BurgerBuilder, axios)