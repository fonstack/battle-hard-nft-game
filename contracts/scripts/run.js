const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('BattleHard');
  const gameContract = await gameContractFactory.deploy(
    ['Gwydion', 'Masamba', 'Helve'],
    [
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_1.png?alt=media&token=ed479490-1170-468f-bc14-5537896dc27a',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_2.png?alt=media&token=cd1d3dcb-ea6e-4da8-a117-ebef32e5d59d',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fhero_3.png?alt=media&token=6aef186d-cc21-4a84-9038-0a03eb43561e',
    ],
    [400, 200, 100], // HP
    [25, 50, 100], // Attack damage
    [18, 23, 32], // Critical Chance
    'Wynoynk', // Boss name
    'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2Fmonster_1.png?alt=media&token=c222d657-1968-4fcc-9732-c05fdcb17c5d', // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log('Contract deployed to:', gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
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
