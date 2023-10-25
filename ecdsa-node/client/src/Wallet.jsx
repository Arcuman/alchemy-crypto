import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1.js"
import { toHex } from "ethereum-cryptography/utils" 
function Wallet({ address, setAddress, balance, setBalance, privateKey, sePrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    sePrivateKey(privateKey);
    const address = toHex(secp.secp256k1.getPublicKey(privateKey))
    setAddress(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key 
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Wallet Address 
        <input placeholder="Type a private key" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
