import React,  { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import WithdrawForm from './WithdrawForm';

const Form = () => {
    const [metamaskStatus, setMetamaskStatus] = useState('LOADING');

    // Detect Metamask and ChainID
    detectEthereumProvider({mustBeMetaMask: true})
    .then(provider => {
        if (provider) {
            ethereum.on('connect', ethereum => {
                if (ethereum.chainId !== "0xaef3") {
                    alert("Please connect to the CELO Alfajores testnet");
                    window.location.reload();
                }
            });
            setMetamaskStatus('CONNECTED');
        } else {
            setMetamaskStatus('NOT_FOUND');
        }
    })
    .catch(() => {
        setMetamaskStatus('NOTFOUND');
    });

    return metamaskStatus === 'CONNECTED' ? (
        <WithdrawForm />
    ) : (metamaskStatus === 'LOADING' ? <p>Loading...</p> : <p>Please Install Metamask</p>);
}

export default Form
