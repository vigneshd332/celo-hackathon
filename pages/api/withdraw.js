const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
const { privateKey, account } = require('../../env');

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = ContractKit.newKitFromWeb3(web3);

kit.connection.addAccount(privateKey);

export default async function handler(req, res) {
  const stabletoken = await kit.contracts.getStableToken();
  const cUSDBalance = await stabletoken.balanceOf(account);

  try{
    const cUSDtx = await stabletoken.transfer(req.body.address, req.body.amount*10000000000000).send({from: account, feeCurrency: stabletoken.address});
    const cUSDReceipt = await cUSDtx.waitReceipt();
    res.status(200).json({ message: cUSDReceipt });
  }
  catch(err){
    console.log(err);
    res.status(500).json({ message: 'Transaction failed' });
  }
}
