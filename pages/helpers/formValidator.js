import Web3 from 'web3';

export const validateAddress = (address) => {
    return Web3.utils.isAddress(address);
}

export const validateInteger = (value) => {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}