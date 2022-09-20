const hre = require("hardhat");


async function main() {
  const RoboPunksNFTs = await hre.ethers.getContractFactory("RoboPunksNFTs");
  const roboPunksNFT = await RoboPunksNFTs.deploy();

  await roboPunksNFT.deployed();

  console.log(`RoboPunksNFT deployed to: ${roboPunksNFT.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
