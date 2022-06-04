
import './App.css';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./WavePortal.json"
function App() {
  //contract address
  const contractAddress = " ";
  //contract abi
  const contractAbi = abi.abi;
  //changing accounts
  const [CurrentAcc, SetCurrentAcc] = useState("");
  //changing or getting allwaves
  const [currentwaves,Setallwaves]=useState("");
  //function to check whether wallet connected or not
  const ConnectedorNot = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log("We Detected No issues");
    }
    else {
      console.log("Please Make Sure You web Has metamask Wallet");
    }

    //getaccounts
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      console.log("We found and Authenticated Account");
      console.log("The account is:", accounts[0]);
      SetCurrentAcc(accounts[0]);
    }
    else {
      console.log("We didnt Found an Authorized Acount Please Make sure you have accounts in the wallet");

    }

  }
  //connect wallet function
  const ConnectWallet = async () => {
    const { ethereum } = window;
    try {
      if (!ethereum) {
        console.log("Please make sure Your Metamask is Properly Setted UP!!!");
        const acc = await ethereum.request({ method: "eth_requestAccounts" });
        SetCurrentAcc(acc);
        // console.log("The account setted up is:", acc);
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  //wavemefunction
  const waveonme = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please makesure ur Ethereum Object Exist");
    }
    else {
      const Provider = new ethers.providers.Web3Provider(ethereum);
      const Signer = Provider.getSigner();
      const wavecontract = new ethers.Contract(contractAddress, contractAbi, Signer);
      const wavetxn = await wavecontract.wave();
      console.log("The hash generated is:", wavetxn.hash);
      let count = await wavecontract.Totalwaves();
      console.log("The totalwaves we got is:", count.toUint256());
    }
  }

  const getallwaves=async()=>
  {
    const {ethereum}=window;
    if(ethereum)
    {
      const provider=new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const contract=new ethers.Contract(contractAddress,contractAbi,signer);
      const waves=await contract.ALLwaves();

      let Finalwaves=[];

     waves.forEach(element => {
        Finalwaves.push({
          address:element.from,
          message:element.message,
          timestamp:element.time
        })
      });
Setallwaves(Finalwaves);
}
  }

  useEffect(() => {
    ConnectedorNot();
  }, [])
  return (
    <div className="App">
      <h1>Hello Hydra Richie Here.</h1>
      <h2 className="text">Hello and Welcome to my Kingdom.</h2>
      <body>
        <button id="foot"><button className="button-os" onClick={ConnectWallet}> Connect to Wallet</button></button>
      </body>
      <body>
        <button id="foot"><button className="button-os" onClick={waveonme}>wave to ME</button></button>
      </body>

</div>
  )}





 

export default App;
