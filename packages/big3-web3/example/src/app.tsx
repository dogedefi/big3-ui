import '@/assets/styles/global.pc.less';
import '@/assets/styles/global.mobile.less';

import 'react';
// import { setLocale } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';
import { getLibrary, Web3ReactProvider } from 'web3-connector';

// setLocale('en-US', false);
// setLocale('zh-CN', false);

export function rootContainer(container: any) {
  return (
    <ConfigProvider locale={enUS}>
      <Web3ReactProvider getLibrary={getLibrary}>{container}</Web3ReactProvider>
    </ConfigProvider>
  );
}
