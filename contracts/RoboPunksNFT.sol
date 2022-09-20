//SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFTs is ERC721, Ownable {
    uint public mintPrice;
    uint public totalSupply;
    uint public maxSupply;
    uint public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;//sites like opensea detects where the images are located using this
    address payable public withdrawWallet;

    mapping(address => uint ) public walletMints;

    constructor() payable ERC721('RoboPunks', 'RP'){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnables(bool isPublicMintEnabled_) external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint tokenId_) public view override returns(string memory){
        require(_exists(tokenId_), 'Token doesnot exists!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdreaw() external onlyOwner{
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, 'Withdraw failed');
    }

    function mint(uint quantity_) public payable{
        require(isPublicMintEnabled, "Minting is not enabled");
        require(msg.value == quantity_ * mintPrice, "Wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold out");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "Exceeded max wallet");

        for(uint i = 0; i < quantity_; i++){
            uint newTokenId = totalSupply +1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
