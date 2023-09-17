const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const balances = require('./storage/intialBalances.json')
const { getAddressPK, recoverAddress } = require('./utils')


app.use(cors());
app.use(express.json());

// const balances = {
//   "0x1": 100,
//   "0x2": 50,
//   "0x3": 75,
// };

app.get("/balance/:address", (req, res) => {
  const { address: privateKey } = req.params;
  const address = getAddressPK(privateKey)
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sign, recipient, amount } = req.body;

  const sender = recoverAddress(sign, [amount, recipient])
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!sender) {
    res.status(400).send({ message: "you are not permitied to do this" })
    return
  }

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
