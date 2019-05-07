import React from 'react';
import Burger from '../../../Burger/Burger'
import Button from '../../Button/Button'
import styles from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (  <div className={styles.CheckoutSummary}>
        <h1>Enjoy your meal!</h1>
        <div style={{width: '%100', height: '300px', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btnType='Negative' onClick={props.cancelCheckout}>Cancel</Button>
        <Button btnType='Positive' onClick={props.continueCheckout}>Continue</Button>
    </div>  );
}
 
export default checkoutSummary;