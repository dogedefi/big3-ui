import styles from './index.less';
import { WalletStatus } from '@/components/Wallet';
import { ChainStatus } from '@/components/Chain';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <WalletStatus />
      <ChainStatus />
    </div>
  );
}
