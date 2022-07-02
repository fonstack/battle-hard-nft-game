// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

import 'hardhat/console.sol';
import './libraries/Base64.sol';

contract BattleHard is ERC721 {
    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        uint256 criticalChance;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    CharacterAttributes[] defaultCharacters;

    // NFTs tokenId => NFT attributes
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    // NFT owner => NFT tokenId
    mapping(address => uint256) public nftHolders;

    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHps,
        uint256[] memory characterAttackDmgs,
        uint256[] memory characterCriticalChances
    ) ERC721('Heroes', 'HERO') {
        for (uint256 i = 0; i < characterNames.length; i += 1) {
            defaultCharacters.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imageURI: characterImageURIs[i],
                    hp: characterHps[i],
                    maxHp: characterHps[i],
                    attackDamage: characterAttackDmgs[i],
                    criticalChance: characterCriticalChances[i]
                })
            );

            CharacterAttributes memory c = defaultCharacters[i];
            console.log('Done initializing %s w/ HP %s, AD %s', c.name, c.hp, c.attackDamage);
        }

        // First NFT => ID 1
        _tokenIds.increment();
    }

    function mintCharacterNFT(uint256 _characterIndex) external {
        uint256 newNFTId = _tokenIds.current();

        // Assigns the tokenId to the caller's wallet address.
        _safeMint(msg.sender, newNFTId);

        nftHolderAttributes[newNFTId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imageURI: defaultCharacters[_characterIndex].imageURI,
            hp: defaultCharacters[_characterIndex].hp,
            maxHp: defaultCharacters[_characterIndex].maxHp,
            attackDamage: defaultCharacters[_characterIndex].attackDamage,
            criticalChance: defaultCharacters[_characterIndex].criticalChance
        });

        console.log('Minted NFT w/ tokenId %s and characterIndex %s', newNFTId, _characterIndex);

        nftHolders[msg.sender] = newNFTId;
        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);
        string memory strCriticalChance = Strings.toString(charAttributes.criticalChance);

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                charAttributes.name,
                ' #',
                Strings.toString(_tokenId),
                '", "description": "This is an NFT that lets people play in the game Battle Hard!", "image": "',
                charAttributes.imageURI,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strHp,
                ', "max_value":',
                strMaxHp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDamage,
                '}, { "trait_type": "Critical Chance", "value": ',
                strCriticalChance,
                '} ]}'
            )
        );

        string memory output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }
}
