// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

import 'hardhat/console.sol';
import './libraries/Base64.sol';

contract BattleHard is ERC721 {
    uint256 private randomSeed;

    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        uint256 criticalChance;
    }

    struct BigBoss {
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    CharacterAttributes[] defaultCharacters;

    // NFTs tokenId => NFT attributes
    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;

    // NFT owner => NFT tokenId
    mapping(address => uint256) public nftHolders;

    BigBoss public bigBoss;

    // Events
    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
    event AttackComplete(address sender, uint256 newBossHp, uint256 newPlayerHp, bool isCriticalHit);

    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHps,
        uint256[] memory characterAttackDmgs,
        uint256[] memory characterCriticalChances,
        string memory bossName,
        string memory bossImageURI,
        uint256 bossHp,
        uint256 bossAttackDamage
    ) ERC721('Heroes', 'HERO') {
        // Seed initialization
        randomSeed = (block.timestamp + block.difficulty) % 100;

        // Boss initialization
        bigBoss = BigBoss({name: bossName, imageURI: bossImageURI, hp: bossHp, maxHp: bossHp, attackDamage: bossAttackDamage});
        console.log('Done initializing boss %s w/ HP %s, img %s', bigBoss.name, bigBoss.hp, bigBoss.imageURI);

        // Characters initialization
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

        emit CharacterNFTMinted(msg.sender, newNFTId, _characterIndex);
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
                '}, { "trait_type": "Critical Chance", "display_type": "boost_percentage", "value": ',
                strCriticalChance,
                '} ]}'
            )
        );

        string memory output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

    function attackBoss() public {
        // Get the state of the player's NFT.
        uint256 nftTokenIdOfPlayer = nftHolders[msg.sender];
        CharacterAttributes storage player = nftHolderAttributes[nftTokenIdOfPlayer];

        console.log('\nPlayer w/ character %s about to attack. Has %s HP and %s AD', player.name, player.hp, player.attackDamage);
        console.log('Boss %s has %s HP and %s AD', bigBoss.name, bigBoss.hp, bigBoss.attackDamage);

        // Make sure the player has more than 0 HP.
        require(player.hp > 0, 'Error: character must have HP to attack boss.');

        // Make sure the boss has more than 0 HP.
        require(bigBoss.hp > 0, 'Error: boss must have HP to attack character.');

        // Allow player to attack boss.
        randomSeed = (block.difficulty + block.timestamp + randomSeed) % 100;
        bool isCriticalHit = randomSeed <= player.criticalChance;
        uint256 finalPlayerAttackDamage = isCriticalHit ? player.attackDamage * 2 : player.attackDamage;

        console.log('Is critical %s, randomseed %s, critical chance %s', isCriticalHit, randomSeed, player.criticalChance);

        if (isCriticalHit) {
            console.log('Player will attack boss with a critical hit!');
        }

        if (bigBoss.hp < finalPlayerAttackDamage) {
            bigBoss.hp = 0;
        } else {
            bigBoss.hp = bigBoss.hp - finalPlayerAttackDamage;
        }

        // Allow boss to attack player.
        if (bigBoss.hp > 0) {
            if (player.hp < bigBoss.attackDamage) {
                player.hp = 0;
            } else {
                player.hp = player.hp - bigBoss.attackDamage;
            }
        }

        // Console for ease.
        console.log('\nPlayer attacked boss. New boss hp: %s', bigBoss.hp);
        console.log('Boss attacked player. New player hp: %s\n', player.hp);

        emit AttackComplete(msg.sender, bigBoss.hp, player.hp, isCriticalHit);
    }

    function checkIfUserHasNFT() public view returns (CharacterAttributes memory) {
        // Get the tokenId of the user's character NFT
        uint256 userNftTokenId = nftHolders[msg.sender];
        // If the user has a tokenId in the map, return their character.
        if (userNftTokenId > 0) {
            return nftHolderAttributes[userNftTokenId];
        } else {
            CharacterAttributes memory emptyStruct;
            return emptyStruct;
        }
    }

    function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
        return defaultCharacters;
    }

    function getBigBoss() public view returns (BigBoss memory) {
        return bigBoss;
    }
}
