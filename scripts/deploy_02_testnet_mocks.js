const bre = require('@nomiclabs/buidler')
const { ethers, upgrades } = bre

async function main() {
    await bre.run('compile')

    const ERC20UpgradeSafe = await ethers.getContractFactory('ERC20UpgradeSafe')
    const lpToken = await upgrades.deployProxy(ERC20UpgradeSafe, [])
    await lpToken.deployed()
    console.log('LP token deployed to:', lpToken.address)

    const MockOracle = await ethers.getContractFactory('MockOracle')
    const mcapOracle = await MockOracle.deploy('Mcap oracle')
    await mcapOracle.deployed()
    console.log('Market cap oracle deployed to:', mcapOracle.address)

    const tokenPriceOracle = await MockOracle.deploy('Token price oracle')
    await tokenPriceOracle.deployed()
    console.log('Token price oracle deployed to:', tokenPriceOracle.address)
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
