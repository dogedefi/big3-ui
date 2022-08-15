interface Ethereum {
  send: unknown
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
  request: (...args: any[]) => any,
  isMetaMask: boolean,
}

interface BinanceChain {
  send: unknown
  enable: () => Promise<string[]>
  on?: (method: string, listener: (...args: any[]) => void) => void
  removeListener?: (method: string, listener: (...args: any[]) => void) => void
  request: (...args: any[]) => any
}

declare interface Window {
  ethereum?: Ethereum
  BinanceChain?: BinanceChain
  MSStream: any
}

declare const __DEV__: boolean
