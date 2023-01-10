import React from 'react'
import { ethers } from 'ethers';

const Buy = ({state}) => {

  const {contract} = state; 

  const buycoffee= async (event)=>{
    event.preventDefault();  // prevent from refreshing the page 
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = {value:ethers.utils.parseEther("0.00001")};
    // console.log(name,message,contract);

    /**
     * calling buyCoffee function of contract 
     * to call contract function we need contract instance (address,abi,signer) */
    const transaction = await contract.buyCoffee(name,message,amount);
    await transaction.wait(); // wait for transaction to complete
    console.log("transaction complete")
  };

  return (
    <div className='container-md' style={{width:"50%",marginTop:"25px"}} >
      <form onSubmit={buycoffee}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input className='form-control' type="text" id="name" placeholder="Enter Your Name" ></input>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Message</label>
          <input className='form-control' type="text" id="message" placeholder="Enter Your Message" ></input>
        </div>
        <button className='btn btn-primary' type='submit' disabled={!state.contract}>Pay</button>
      </form>
    </div>
  );
}

export default Buy