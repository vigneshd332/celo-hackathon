import React,  {useState } from 'react';
import styles from './style.module.css';
import { validateAddress, validateInteger } from '../../helpers/formValidator';

const Form = () => {
    const [address, setAddress] = useState(''); 
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(0);
    const [estAmount, setEstAmount] = useState(0);

    const handleSetAmount = (e) => {
        setAmount(e.target.value);
        setEstAmount(Math.round((e.target.value*74.31 + Number.EPSILON) * 100) / 100);
    }

    const handleSetAddress = (e) => {
        setAddress(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = () => {
        if(!validateAddress(address)) {
            setError('Invalid Address');
            return;
        }
        else if(!validateInteger(amount)) {
            if(amount<1) {
                setError('Amount cannot be 0 or negative');
                return;
            }
            setError('Amount must be a Positive Integer');
            return;
        }
        else{
            setError('');
        }
    }
    return (
        <div className={styles.mainForm}>
            <h1>CELO -&gt; INR</h1>
            <input className={styles.formInput} onChange={handleSetAddress} type="text" placeholder="Enter Celo Address (NOT ETHEREUM ADDRESS)" />
            <input className={styles.formInput} onChange={handleSetAmount} type="text" placeholder="Enter Amount in cUSD" />
            <span>Estimated Cost in INR: {estAmount}</span>
            <span>{error}</span>
            <button className={styles.transferButton} onClick={handleSubmit}>Transfer</button>
        </div>
    )
}

export default Form
