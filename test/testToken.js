const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { toBigNum, fromBigNum } = require("./utils.js");

var owner;
var network;
var exchangeRouter;
var exchangeFactory;
var wBNB;
var token;
var userWallet;
var userWallet1;
var userwallet2;



describe("Create Account", () => {

  it("Create Account", async () => {
    [owner] = await ethers.getSigners();
    network = await owner.provider._networkPromise;
    userWallet = ethers.Wallet.createRandom();
    userWallet1 = ethers.Wallet.createRandom();
    userWallet2 = ethers.Wallet.createRandom();
    userWallet = userWallet.connect(ethers.provider);
    var tx = await owner.sendTransaction({
      to: userWallet.address,
      value: ethers.utils.parseUnits("1", 18)
    });
    await tx.wait();
  });

});

describe("Exchage deploys", () => {

  it("Factory deploy", async () => {
    const Factory = await ethers.getContractFactory("PancakeFactory");
    exchangeFactory = await Factory.deploy(owner.address);
    await exchangeFactory.deployed();
    console.log(await exchangeFactory.INIT_CODE_PAIR_HASH());
  });

  it("wBNB deploy", async () => {
    const WBNB = await ethers.getContractFactory("WBNB");
    wBNB = await WBNB.deploy();
    await wBNB.deployed();
  });

  it("Router deploy", async () => {
    const Router = await ethers.getContractFactory("PancakeRouter");
    exchangeRouter = await Router.deploy(
      exchangeFactory.address,
      wBNB.address
    );
    await exchangeRouter.deployed();
  });

  it("Token deploy", async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await upgrades.deployProxy(Token, [exchangeRouter.address, "200", toBigNum("100000000", 18)]);
    await token.deployed();
  });

})

describe("constract prepare", () => {

  it("approve", async () => {
    var tx = await token.approve(
      exchangeRouter.address,
      ethers.utils.parseUnits("1000000", 18)
    );
    await tx.wait();
  });

  it("add liquidity eth", async () => {
    var tx = await exchangeRouter.addLiquidityETH(
      token.address,
      ethers.utils.parseUnits("1000000", 18),
      0,
      0,
      owner.address,
      "1234325432314321",
      { value: ethers.utils.parseUnits("1", 18) }
    )
    await tx.wait();
  });
});

describe("test", () => {

  it(" send 1000 tokens to userWallets", async () => {
    var tx = await token.transfer(userWallet.address, toBigNum("1000", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet1.address, toBigNum("1000", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet2.address, toBigNum("1000", 18));
    await tx.wait();
  });

  it(" send 1 Token token to userWallets to check reflection result", async () => {
    var tx = await token.transfer(userWallet.address, toBigNum("1", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet1.address, toBigNum("1", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet2.address, toBigNum("1", 18));
    await tx.wait();

    await checkBalance();
  });

  it(" exclude userwallet2 from reflection", async () => {

    var tx = await token.setIsDividendExempt(userWallet2.address, true);
    await tx.wait();

  });

  it(" send 1000 tokens to userWallet1,1 token to userWallet1 and userWallet2", async () => {
    var tx = await token.transfer(userWallet.address, toBigNum("1000", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet1.address, toBigNum("1", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet2.address, toBigNum("1", 18));
    await tx.wait();
  });

  it(" send 1 Token token to userWallets to check reflection result(exclude useWallet2)", async () => {
    var tx = await token.transfer(userWallet.address, toBigNum("1", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet1.address, toBigNum("1", 18));
    await tx.wait();
    var tx = await token.transfer(userWallet2.address, toBigNum("1", 18));
    await tx.wait();
    
    await checkBalance();
  });

  it("mint test", async () => {
    var tx = await token.mint(userWallet1.address, toBigNum("100", 18));
    await tx.wait();

    checkBalance();
  });

  it("burn test", async () => {
    var tx = await token.mint(userWallet1.address, toBigNum("100", 18));
    await tx.wait();
    checkBalance();
  });

  it("buy test", async () => {
    var tx = await exchangeRouter.connect(userWallet).swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.01", 18),
      }
    );
    await tx.wait();
    checkBalance();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 18));
    await tx.wait();

    checkBalance();

  });

  it("sell test", async () => {
    var tx = await token.connect(userWallet).approve(exchangeRouter.address, ethers.utils.parseUnits("100", 18));
    await tx.wait();

    var tx = await exchangeRouter.connect(userWallet).swapExactTokensForETHSupportingFeeOnTransferTokens(
      toBigNum("100", 18),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
    checkBalance();

  });

});

const checkBalance = async () => {
  // console.log("user wallet wBNB balance", fromBigNum(await ethers.provider.getBalance(userWallet.address), 18));
  console.log("user wallet token balance", fromBigNum(await token.balanceOf(userWallet.address), 18));
  console.log("user wallet1 token balance", fromBigNum(await token.balanceOf(userWallet1.address), 18));
  console.log("user wallet2 token balance", fromBigNum(await token.balanceOf(userWallet2.address), 18));
}

