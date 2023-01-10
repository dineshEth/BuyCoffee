import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './ABI/BuyCoffee.json'
import './App.css';
import Buy from './Components/Buy';
import Memos from './Components/Memos';
import IMG from './coffee.jpg';


function App() {
  const {ethereum} = window;
  const contractAddress = "0x2FC3c28BFd3968397DD114197172458fc0fd5135"; // contract address
  const ContractABI = abi.abi;

  const [state,setState] = useState({
    provider: null,
    signer : null,
    contract:null
  });
  const [account, setAccount] =useState("none")

  const connectWallet = async ()=>{
    try {
        if(ethereum){
          //requests accounts 
        const account = await ethereum.request({method : "eth_requestAccounts",});
          //event: if chain is changed 
        ethereum.on("chainChanged",()=>{ 
          window.location.reload(); // then reloads 
        });
          // accounts changed 
        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const provider = new ethers.providers.Web3Provider(ethereum); //etherjs provides a Web3 provider to fetch metamask account.
        const signer =  provider.getSigner(); //read and sign the transaction
        const contract = new ethers.Contract(contractAddress,ContractABI,signer); // contract instance
        setAccount(account[0])
        setState({provider,signer,contract})
      }else{
        window.alert("Please install metamask");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    connectWallet(); 
  },[]);
  // console.log(state)

  return (
    <div style={{backgroundColor:"#EFEFEF", height:"100%"}}>
      <img src={IMG} alt="coffee" className='img-fluid' style={{height:"100vh",width:"100%"}} />
      <p className='text-muted lead '
        style={{textAlign:"center",marginTop:"10px",marginLeft:"5px"}}>
        <small>{ account && <small>connected Account</small> -{account}}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
