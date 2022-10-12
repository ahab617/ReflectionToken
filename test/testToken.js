const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toBigNum, fromBigNum } = require("./utils.js");

var owner;
var network;
var exchangeRouter;
var exchangeFactory;
var wBNB;
var token;
var userWallet;



describe("Create Account", () => {

  it("Create Account", async () => {
    [owner] = await ethers.getSigners();
    network = await owner.provider._networkPromise;
    userWallet = ethers.Wallet.createRandom();
    userWallet = userWallet.connect(ethers.provider);
    var tx = await owner.sendTransaction({
      to: userWallet.address,
      value: ethers.utils.parseUnits("10", 8)
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
    token = await Token.deploy(exchangeRouter.address, wBNB.address, "800");
    await token.deployed();
  });

})

describe("constract prepare", () => {

  it("approve", async () => {
    var tx = await token.approve(
      exchangeRouter.address,
      ethers.utils.parseUnits("100000", 5)
    );
    await tx.wait();
  });

  it("add liquidity eth", async () => {
    var tx = await exchangeRouter.addLiquidityETH(
      token.address,
      ethers.utils.parseUnits("10000", 5),
      0,
      0,
      owner.address,
      "1234325432314321",
      { value: ethers.utils.parseUnits("0.1", 18) }
    )
    await tx.wait();
  });

  it(" send some Token token to userWallet", async () => {
    var tx = await token.transfer(userWallet.address, toBigNum("5000", 5));
    await tx.wait();
  });


});

describe("Legercy exchange", () => {

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });


  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });
  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });
  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });
  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });


  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("2", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();


  });
  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it("buy test", async () => {
    var tx = await exchangeRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
      0,
      [
        wBNB.address,
        token.address
      ],
      userWallet.address,
      "341443532432123",
      {
        value:
          ethers.utils.parseUnits("0.001", 18),
      }
    );
    await tx.wait();
  });



  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1000", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });

  it("sell test", async () => {
    var tx = await exchangeRouter.swapExactTokensForETHSupportingFeeOnTransferTokens(
      ethers.utils.parseUnits("1000", 5),
      0,
      [token.address,
      wBNB.address],
      userWallet.address,
      "124325454365443"
    );
    await tx.wait();
  });




  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

  it(" send some Token token to userWallet", async () => {

    var tx = await token.transfer(userWallet.address, toBigNum("1000", 5));
    await tx.wait();

  });

});

