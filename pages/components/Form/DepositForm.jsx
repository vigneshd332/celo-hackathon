import React, { useState } from 'react';
import { validateInteger } from '../../helpers/formValidator';
import { address as mainAddress } from '../../../env';
import fetch from 'node-fetch';
import styles from './style.module.css';

const DepositForm = () => {
    const [address, setAddress] = useState(''); 
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(0);
    const [estAmount, setEstAmount] = useState(0);

    // Form Handlers
    const handleSetAmount = (e) => {
        setAmount(e.target.value);
        setEstAmount(Math.round((e.target.value*74.31 + Number.EPSILON) * 100) / 100);
    }
    const handleSetAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleSubmit = () => {
        if(address==="") {
            setError('UPI ID cannot be empty');
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
            const transactionParameters = {
                nonce: '0x00', // ignored by MetaMask
                gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                gas: '0x2710', // customizable by user during MetaMask confirmation.
                to: mainAddress,
                from: window.ethereum.selectedAddress,
            };
            // window.ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [transactionParameters],
            //   })
            //   .then(result => {
            //       console.log(result);
            //   })
            //   .catch(err => console.log(err));
        }
    }

    return (
        <div className={styles.mainForm}>
            <h1>CELO -&gt; INR</h1>
            <input className={styles.formInput} onChange={handleSetAddress} type="text" placeholder="Enter UPI ID" />
            <input className={styles.formInput} onChange={handleSetAmount} type="text" placeholder="Enter Equivalent cUSD Amount" />
            <span>Estimated Payout in INR: {estAmount}</span>
            <span id="messageDisplay">{error}</span>
            <button className={styles.transferButton} onClick={handleSubmit}>Transfer</button>
        </div>
    )
}

export default DepositForm