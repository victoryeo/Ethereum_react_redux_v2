import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

const api_key = process.env.REACT_APP_API_KEY
const rinkeby = `https://eth-rinkeby.alchemyapi.io/v2/${api_key}`
const RINKEBY = 4

export const injected = new InjectedConnector({
  supportedChainIds: [RINKEBY],   //rinkeby
})

export function getLibrary(provider:any): Web3Provider {
  console.log("getLibrary")
  console.log(provider)
  //const library = new Web3(provider)
  //return library

  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}