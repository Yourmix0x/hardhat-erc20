import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC20", function () {
  it("transfer tokens correctly", async function () {
    const [alice, bob] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    const erc20Token = await ERC20.deploy("Yourmix", "YOM", 18);

    await erc20Token.mint(alice.address, 300);

    expect(await erc20Token.transfer(bob.address, 100)).to.changeTokenBalance(
      erc20Token,
      [alice, bob],
      [-100, 100]
    );
  });
});
