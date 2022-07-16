import './pc.less';
import './mobile.less';

import { useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import WalletModal from '../WalletModal';

export const connectedKey = 'connected';

export default () => {
  const [visible, setVisible] = useState(false);
  const { account } = useWeb3React();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleLogout = () => {
    setVisible(true);
  };

  const addressDisplay = useMemo(() => {
    if (account) {
      return account.substr(0, 5) + '...' + account.substr(-5);
    }
  }, [account]);

  return (
    <div className="wallet-status">
      <WalletModal visible={visible} onClose={() => setVisible(false)} />
      {!account && (
        <Button onClick={handleConnect} className="btn-connect">
          Connect Wallet
        </Button>
      )}
      {account && (
        <a className="btn-connected hollowout" onClick={handleLogout}>
          <span>{addressDisplay}</span>
        </a>
      )}
    </div>
  );
};
