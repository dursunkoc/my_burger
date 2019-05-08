import React from 'react';
import styles from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let stylesTobeApplied = [styles.InputElement];
    
    if(!props.valid && props.touched){
        stylesTobeApplied.push(styles.Invalid)
    }

    let appliedStyles = stylesTobeApplied.join(' ')
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={appliedStyles}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea className={appliedStyles}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case 'select':
            inputElement = <select className={appliedStyles}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(o => <option
                    key={o.value}
                    value={o.value}>{o.displayValue}</option>)}
            </select>
            break;
        default:
            inputElement = <input className={appliedStyles}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>);
}

export default Input;