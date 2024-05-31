import {ethers} from "hardhat";

async function main() {

    const contract = await ethers.getContractFactory('ArcumanToken');
    contract.connect();

    const ARC = await ethers.deployContract("ArcumanToken");

    await ARC.waitForDeployment();

    console.log(await ARC.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
