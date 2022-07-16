// TODO extra these code as a hook to big3-web3
export default () => `
import { useState, useEffect } from 'react';
import { Models } from '../../plugin-model/useModel';
import { initChainModel } from 'big3-web3'
export type Chain = Models<'@@chain'>;
export default () => {
  return initChainModel();
}
`
