const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('BattleHard');
  const gameContract = await gameContractFactory.deploy(
    ['Gwydion', 'Masamba', 'Helve'],
    [
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_1.png?alt=media&token=46b48a15-7a38-41a9-a47f-75e65f4cb0ab',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_2.png?alt=media&token=be84c8c1-f6e8-4cdc-9225-c284fa8cd543',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_3.png?alt=media&token=4680e761-9791-4f29-bce4-2f4bdd30b775',
    ],
    [300, 200, 100], // HP
    [25, 50, 125], // Attack damage
    [13, 17, 26] // Critical Chance
  );
  await gameContract.deployed();
  console.log('Contract deployed to:', gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log('Minted NFT #1');

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log('Minted NFT #2');

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  console.log('Minted NFT #3');

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log('Minted NFT #4');

  console.log('Done deploying and minting!');
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
