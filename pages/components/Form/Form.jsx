import React,  { useState } from 'react';
import styles from './style.module.css';
import { validateAddress, validateInteger } from '../../helpers/formValidator';
import fetch from 'node-fetch';
import detectEthereumProvider from '@metamask/detect-provider';

const Form = () => {
    const [address, setAddress] = useState(''); 
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(0);
    const [estAmount, setEstAmount] = useState(0);
    const [metamaskStatus, setMetamaskStatus] = useState('LOADING');

    // Detect Metamask
    detectEthereumProvider()
    .then(provider => {
        if (provider) {
            setMetamaskStatus('CONNECTED');
        } else {
            setMetamaskStatus('NOT_FOUND');
        }
    })
    .catch(err => {
        setMetamaskStatus('NOTFOUND');
    });

    // Form Handlers
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
            setError('Please Wait...');
            const data = {
                address: address,
                amount: amount
            };
            fetch('/api/withdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                setError('');
                if (data.message.blockNumber!==undefined){
                    document.getElementById('messageDisplay').innerHTML = 'View the Transaction <a id="'+styles["receiptLink"]+'" target="_blank" href="https://alfajores-blockscout.celo-testnet.org/block/'+data.message.blockNumber+'/transactions">Here</a>';
                }
                else{
                    setError('Transaction Failed');
                }
            })
            .catch(err => console.log(err));
        }
    }

    return metamaskStatus === 'CONNECTED' ? (
        <div className={styles.mainForm}>
            <h1>INR -&gt; CELO</h1>
            <input className={styles.formInput} onChange={handleSetAddress} type="text" placeholder="Enter Celo Address (NOT ETHEREUM ADDRESS)" />
            <input className={styles.formInput} onChange={handleSetAmount} type="text" placeholder="Enter Amount in cUSD" />
            <span>Estimated Cost in INR: {estAmount}</span>
            <span id="messageDisplay">{error}</span>
            <button className={styles.transferButton} onClick={handleSubmit}>Transfer</button>
        </div>
    ) : (metamaskStatus === 'LOADING' ? <p>Loading...</p> : <p>Please Install Metamask</p>);
}

export default Form
