import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC20", function () {
  it("transfer tokens correctly", async function () {
    const [alice, bob] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    const erc20Token = await ERC20.deploy("Yourmix", "YOM", 18);

    await erc20Token.mint(alice.address, 300);

    // logging balances before transfer
    console.log(
      "Alice balance here is",
      (await erc20Token.balanceOf(alice.address)).toString()
    );

    expect(await erc20Token.transfer(bob.address, 100)).to.changeTokenBalance(
      erc20Token,
      [alice, bob],
      [-100, 100]
    );

    
    expect(
      await erc20Token.connect(bob).transfer(alice.address, 50)
    ).to.changeTokenBalance(erc20Token, [alice, bob], [50, -50]);
  });
});
