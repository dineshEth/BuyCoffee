
const hre = require("hardhat");


async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

async function consoleBalances(addresses){
    let counter =0;
    for(const address of addresses){
      console.log(`Address ${counter} balance : `, await getBalances(address));
      counter++;
    }
  }

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const msg = memo.description;
    console.log(`timestamp ${timestamp} ,name : ${name} , from : ${from} ,msg : ${msg}`);
  }
}

async function main() {
  
    const [owner,from1,from2,from3] = await hre.ethers.getSigners();
    
    const coffee = await hre.ethers.getContractFactory("BuyCoffee"); // get the contract
    const contract =await coffee.deploy();  // instance of the contract 

    await contract.deployed();  // deploy your smart contract

    console.log("Addresss of contract: ", contract.address);

    const addresses= [owner.address,from1.address];
    console.log("Before buying coffee");
    await consoleBalances(addresses);

    const amount = {value:hre.ethers.utils.parseEther("1")};
    await contract.connect(from1).buyCoffee("from1", "very nice coffee",amount);
    await contract.connect(from2).buyCoffee("from2", "very nice coffee!",amount);
    await contract.connect(from3).buyCoffee("from3", "very nice coffee :)",amount);
    
    console.log("After buying coffee");
    await consoleBalances(addresses);


    const memos = await contract.getMemo();
    consoleMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
