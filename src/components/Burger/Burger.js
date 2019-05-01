import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.css'

const burger = (props) => {

    let burgerIngredients = [...Object.entries(props.ingredients).map(ingredient =>
        Array(ingredient[1]).fill(ingredient[0])
        .map((name, index)=>{
            return <BurgerIngredient key={name+'_'+index} type={name}/>
        })
    )].reduce((acc, next)=>acc.concat(next))
    
    if (burgerIngredients.length === 0){
        burgerIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {burgerIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>)
}

export default burger