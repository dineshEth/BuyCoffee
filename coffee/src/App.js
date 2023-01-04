import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './ABI/BuyCoffee.json'
import './App.css';
import Buy from './Components/Buy';
import Memos from './Components/Memos';
import IMG from './coffee.jpg';


function App() {
  const {ethereum} = window;
  const contractAddress = "0x2FC3c28BFd3968397DD114197172458fc0fd5135";
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
        const account = await ethereum.request({method : "eth_requestAccounts",});
        ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer =  provider.getSigner();
        const contract = new ethers.Contract(contractAddress,ContractABI,signer);
        setAccount(account)
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
        <small>connected Account -{account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
