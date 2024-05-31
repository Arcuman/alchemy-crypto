const { ethers, upgrades } = require('hardhat');

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
  await proxy.waitForDeployment()

  const proxyAddr = await proxy.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddr
  );

  console.log('Proxy contract address: ' + proxyAddr);

  console.log('Implementation contract address: ' + implementationAddress);
}

main();