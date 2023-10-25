const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());


//private key 1 - fb23143518690359118dc23345545cd3e5fa710f878c767eb697c059f0f5a8f5
//private key 2 - e7ae45bd861236021e63a252e8c4611e1b6d1e2c9f8232f34f69c04c12903018
//private key 3 - 57b0252be52ba0bfcf22543d1b71717e71bd2f43b4c5b14d05804bcf9c46f4d0
const balances = {
  "020643f26f62bc1a8b522434669641399e19a7d2dc84a7f604aef793107bc3b977": 100,
  "020ae17d8238306ab2fe5cfa10e02acf41b5772fc7265b21df4beb2ad9969e940a": 50,
  "03abc57a9a2ecd3499f14020fd301dc13aec3284a1f53c9ebd2d4619a050740ac6": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
