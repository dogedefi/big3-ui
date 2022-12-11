import './pc.less';
import './mobile.less';

import { Button, Modal } from 'antd';
import ImgExplore from '@/assets/images/icon-explore.svg';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from 'big3-web3';
import { useModel } from 'umi';
import { CopyOutlined } from '@ant-design/icons';

interface IWalletModalProps {
  visible: boolean;
  onClose: (args?: string | null) => any;
  handleChatLogin?: () => Promise<void>;
}

type WalletModal = 'yes' | 'no';

export function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

const WalletModal = (props: IWalletModalProps) => {
  const { onClose, visible } = props;
  const { account } = useWeb3React();
  const { chain } = useModel('@@chain');
  const { connect, disconnect, connectors } = useWallet(chain);

  return (
    <Modal
      className="wallet-modal"
      footer={null}
      title={null}
      onCancel={() => onClose()}
      visible={visible}
      zIndex={10}
    >
      <h1>{account ? 'Account' : 'Connect Wallet'}</h1>
      {account && (
        <section className="loggedin">
          <div className="address">
            <span>{account}</span>
            <CopyOutlined
              className="btn-copy link"
              onClick={() => fallbackCopyTextToClipboard(account)}
            />
          </div>
          <div className="btn-group">
            <a
              className="btn-disconnect hollowout coolword"
              onClick={() => {
                disconnect();
                onClose();
              }}
            >
              <span>Disconnect</span>
            </a>
            <a
              className="btn-explore"
              target="_blank"
              href={`${chain?.config?.blockExplorerUrls[0]}address/${account}`}
            >
              <img src={ImgExplore} />
              View on blockchain
            </a>
          </div>
        </section>
      )}
      {!account && (
        <section className="logout">
          {connectors.map((walletConfig) => {
            // WalletCard
            const { title } = walletConfig;

            return (
              <Button
                key={title}
                onClick={() => {
                  connect(walletConfig);
                  onClose();
                }}
                id={`wallet-connect-${title.toLocaleLowerCase()}`}
              >
                {title}
              </Button>
            );
          })}
        </section>
      )}
    </Modal>
  );
};

export default WalletModal;
