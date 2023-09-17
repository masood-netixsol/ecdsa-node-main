import { useState } from "react";
import server from "./server";
import useSignMessage from './utils/'
function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { getSignMessage } = useSignMessage();
  const [signedMessage, setSignedMessage] = useState(undefined)
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (!privateKey) {
      return Error('please enter private key to sign message')
    }
    if (!signedMessage) {
      return Error('please Sign Message before sending it')
    }
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sign: signedMessage,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <button onClick={async (e) => {
        e.preventDefault()
        const [sign,bit] = await getSignMessage([ sendAmount, recipient ], privateKey)
          
        setSignedMessage([sign,bit])
        console.log(sign.toString())

      }}>Sign Transaction</button>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
