import server from "./server";

function Wallet({  privateKey,  setPrivateKey, balance, setBalance,}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  
    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${privateKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
 

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      {/* <label>
        Public Key (to verifyMsg)
        <input placeholder="Type an address, for example: 0x1" value={publicKey} onChange={onPublicChange}></input>
      </label> */}
     
      <label>
        Private Key (to Sign Msg later will be done in/by MetaMask)
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
     

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
