import React from 'react'
import styles from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Meat', type: 'meat'},
    {label:'Cheese', type: 'cheese'},
]

const buildControls = (props) =>{
    let controlComponents = controls.map(ctrl=>
        <BuildControl key={ctrl.label} 
                      label={ctrl.label}
                      disabled={props.disabledValidator(ctrl.type)}
                      addHandler={props.addIngredientHandlerGen(ctrl.type)}
                      removeHandler={props.removeIngredientHandlerGen(ctrl.type)}
        />
    )
    return (
        <div className = {styles.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controlComponents}
            <button className={styles.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.showOrderHandler}>ORDER NOW</button>
        </div>
    )
}

export default buildControls