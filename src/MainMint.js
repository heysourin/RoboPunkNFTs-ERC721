import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFTs from "./RoboPunksNFT.json";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const roboPunksNFTAddress = "0x9679EB73DC004f319dBDd39A0C1ABaCBfe615dCE";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFTs.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount),{
            value: ethers.utils.parseEther((0.0001 * mintAmount).toString())
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  const handleDecreament = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1); // when >1
  };
  const handleIncreament = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1); // when >1
  };
  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            It's 2078. Can the RoboPunks NFT save from destructive rampant NFT
            speculation. Mint RoboPunks to find out!
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex aligh="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 15px"
                onClick={handleDecreament}
              >
                -
              </Button>
              <Input readOnly
              fontFamily="inherit"
              width="100px"
              height="140px"
              textAlign="center"
              paddingLeft="19px"
              marginTop="10px"
              type="number"
              value={mintAmount} />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="0 15px"
                onClick={handleIncreament}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="0 15px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </div>
        ) : (
          <Text
          fontSize="30px"
          letterSpacing="-5.5%"
          fontFamily="VT323"
          textShadow="0 2px 2px #000000"
          color="#D6517D">You must connect wallet to mint!</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
