 const { Contract } = require('ethers');
const hre  =  require('hardhat')

 async function main(){

     const coffee = await hre.ethers.getContractFactory("BuyCoffee"); // contract instance 
     const buyCoffee = await coffee.deploy()  // contract deploy
     
     await buyCoffee.deployed(); //contract deployed successfully or not 
     console.log("Address of contract : ",buyCoffee.address);
 
 }

main()
.catch((err)=>{
     console.error(err);
     process.exitCode =1;
});