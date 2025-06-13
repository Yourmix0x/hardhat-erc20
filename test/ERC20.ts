import { ethers } from "hardhat";

describe("ERC20", function () {
  it("transfer tokens correctly", async function () {
    const [alice, bob] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20Token = await ERC20.deploy("Yourmix", "YOM", 18);
    await erc20Token.transfer(bob.address, 100);
  });
});
