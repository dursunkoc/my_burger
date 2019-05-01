import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'


const orderSummary = (props) =>{
    const ingredients = Object.entries(props.ingredients).map(entry=>{
        return <li key={entry[0]}>{entry[0]} :{entry[1]}</li>
    })
    return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients</p>
        <ul>
            {ingredients}
        </ul>
        <p><strong>Total Price:</strong> {props.totalPrice.toFixed(2)}</p>
        <p>Continue checkout?</p>
        <Button btnType='Negative' onClick={props.cancelOrderHandler}>Cancel</Button>
        <Button btnType='Positive' onClick={props.continueOrderHandler}>Continue</Button>
    </Aux>
    )
}

export default orderSummary