const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('BattleHard');
  const gameContract = await gameContractFactory.deploy(
    ['Gwydion', 'Masamba', 'Helve'],
    [
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2FBattleHard%2Fhero_1.png?alt=media&token=112b1e30-7811-47b4-b25d-35182a96e475',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2FBattleHard%2Fhero_2.png?alt=media&token=0ca7d960-691e-4a04-9e46-c6958850dedc',
      'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2FBattleHard%2Fhero_3.png?alt=media&token=61a5a3fa-0112-490c-91b3-788a42ff347a',
    ],
    [400, 200, 100], // HP
    [25, 50, 100], // Attack damage
    [18, 23, 32], // Critical Chance
    'Wynoynk', // Boss name
    'https://firebasestorage.googleapis.com/v0/b/fon-stack.appspot.com/o/others%2FBattleHard%2Fmonster_1.png?alt=media&token=dd95a8b5-ec25-4b05-902b-87d40bfb9e36', // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log('Contract deployed to:', gameContract.address);
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
