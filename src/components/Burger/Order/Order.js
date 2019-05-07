import React from 'react';
import styles from './Order.css'

const order = (props) => {
    const ingredients = props.ingredients;
    let ingredientsOutput = Object.keys(ingredients)
    .map(i => { return { key: i, value: ingredients[i] } })
    .map(i => <span className={styles.Ingredient} key={i.key} >{i.key} ({i.value})</span>)

    return (
        <div className={styles.Order}>
            <div>Ingredients: {ingredientsOutput}</div>
            <div>Price: <strong>USD {props.totalPrice}</strong></div>
        </div>
    );
}

export default order;