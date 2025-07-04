import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC20", function () {
  it("transfer tokens correctly", async function () {
    const [alice, bob] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    const erc20Token = await ERC20.deploy("Yourmix", "YOM", 18);

    await erc20Token.mint(alice.address, 300);

    await erc20Token.transfer(bob.address, 100);

    const aliceBalance = await erc20Token.balanceOf(alice.address);
    const bobBalance = await erc20Token.balanceOf(bob.address);

    expect(aliceBalance).to.equals(200);
    expect(bobBalance).to.equals(100);
  });
});
