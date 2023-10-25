import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, sePrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setAddress={setAddress}
        address={address}
        privateKey={privateKey}
        sePrivateKey={sePrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
