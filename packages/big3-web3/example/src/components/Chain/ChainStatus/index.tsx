import './pc.less';
import './mobile.less';

import { useModel } from 'umi';
import { Select } from 'antd';
import { chains, useChain } from 'big3-web3';

const { Option } = Select;

const ChainStatus = () => {
  const { chain, setChain } = useModel('@@chain');
  const { switchChain } = useChain({ setChain });

  return (
    <Select value={chain?.name} onChange={switchChain}>
      {Object.keys(chains).map((key) => (
        <Option key={key} value={key}>
          {key}
        </Option>
      ))}
    </Select>
  );
};

export default ChainStatus;
