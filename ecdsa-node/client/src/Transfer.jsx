import { useState } from 'react';
import server from './server';
import * as secp from 'ethereum-cryptography/secp256k1.js';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

function Transfer({ privateKey, setBalance, address }) {
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const hashMessage = (message) => {
        const bytes = utf8ToBytes(message);
        const hash = keccak256(bytes);
        return hash;
      };

      const data = {
        amount: parseInt(sendAmount),
        recipient,
      };
      const msg = JSON.stringify(data);
      const hash = hashMessage(msg);

      const signature = secp.secp256k1.sign(hash, privateKey);

      const stringifyBigInts = obj =>{
        for(let prop in obj){
          let value = obj[prop];
          if(typeof value === 'bigint'){
            obj[prop] = value.toString();
          }else if(typeof value === 'object' && value !== null){
            obj[prop] = stringifyBigInts(value);
          }
        }
        return obj;
      }
  
      // stringify bigints before sending to server
      const sigStringed = stringifyBigInts(signature);

      const {
        data: { balance },
      } = await server.post(`send`, {
        sigStringed,
        sender: address,
        data,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form
      className='container transfer'
      onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder='1, 2, 3...'
          value={sendAmount}
          onChange={setValue(setSendAmount)}></input>
      </label>

      <label>
        Recipient
        <input
          placeholder='Type an address, for example: 0x2'
          value={recipient}
          onChange={setValue(setRecipient)}></input>
      </label>

      <input
        type='submit'
        className='button'
        value='Transfer'
      />
    </form>
  );
}

export default Transfer;
