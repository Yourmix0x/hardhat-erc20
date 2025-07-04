import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ERC20", function () {
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let erc20Token: any;

  this.beforeEach(async function () {
    [alice, bob] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20Mock");
    erc20Token = await ERC20.deploy("Yourmix", "YOM", 18);

    await erc20Token.mint(alice.address, 300);
  });

  it("transfer tokens correctly", async function () {
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

  it("should revert if sender has insufficient balance", async function () {
    await expect(erc20Token.transfer(bob.address, 400)).to.be.revertedWith(
      "ERC20: transfer amount exceeds balance"
    );
  });

  it.only("should emit Transfer event on transfers", async function () {
    await expect(erc20Token.transfer(bob.address, 200)).to.emit(
      erc20Token,
      "Transfer"
    );
  });
});
