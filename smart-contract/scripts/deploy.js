const hre = require("hardhat");

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;

    const lockedAmount = hre.ethers.parseEther("0.001");

    const voting = await hre.ethers.deployContract("Voting");

    await voting.waitForDeployment();

    console.log(
        `Voting contract deployed to ${voting.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
